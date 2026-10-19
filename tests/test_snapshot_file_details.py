"""Run with: python3 -m unittest discover -s tests"""

import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


GENERATOR = Path(__file__).resolve().parents[1] / 'gen-snapshot-file-details.sh'


class SnapshotFileDetailsTests(unittest.TestCase):
    def generate(self, url, headers):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'download.html').write_text('<a href="' + url + '">Download</a>')
            # Mock curl so the test never contacts the network.
            curl = root / 'curl'
            curl.write_text('#!/bin/sh\nprintf "%s" "$TEST_HEADERS"\n')
            curl.chmod(0o755)
            environment = dict(os.environ, PATH=str(root) + os.pathsep + os.environ['PATH'], TEST_HEADERS=headers)
            subprocess.run(['sh', str(GENERATOR)], cwd=root, env=environment, capture_output=True, text=True, check=True)
            source = (root / 'shapshot_file_details.js').read_text()
            prefix = 'var static_snapshot_file_details = {\n'
            suffix = ',\n};\n'
            self.assertTrue(source.startswith(prefix))
            self.assertTrue(source.endswith(suffix))
            # The initializer must contain only serialized data. Parsing it as
            # JSON also rejects any JavaScript appended through header values.
            return json.loads('{' + source[len(prefix):-len(suffix)] + '}')

    def test_normal_headers(self):
        url = 'https://exult.sourceforge.io/snapshots/Exult.exe'
        result = self.generate(url, 'HTTP/2 200\r\ncontent-length: 12345\r\nlast-modified: Mon, 18 Aug 2025 03:53:01 GMT\r\n')
        self.assertEqual(result[url], {'content-length': '12345', 'last-modified': 'Mon, 18 Aug 2025 03:53:01 GMT'})

    def test_header_injection_stays_data(self):
        url = 'https://exult.sourceforge.io/snapshots/Exult.exe'
        payload = "'+(globalThis.injected = true)+'"
        result = self.generate(url, 'last-modified: ' + payload + '\r\n')
        self.assertEqual(result[url]['last-modified'], payload)

    def test_quotes_and_backslashes_stay_data(self):
        url = "https://exult.sourceforge.io/snapshots/Exult's.exe"
        payload = '"; globalThis.injected = true; // \\payload'
        result = self.generate(url, 'Content-Length: ' + payload + '\r\n')
        self.assertEqual(result, {url: {'content-length': payload}})

    def test_headers_are_case_insensitive_and_filtered(self):
        url = 'https://exult.sourceforge.io/snapshots/Exult.exe'
        result = self.generate(url, 'Content-Length: 42\r\nLAST-MODIFIED: yesterday\r\nX-Unused: ignored\r\n')
        self.assertEqual(result[url], {'content-length': '42', 'last-modified': 'yesterday'})

    def test_missing_headers(self):
        url = 'https://exult.sourceforge.io/snapshots/Exult.exe'
        self.assertEqual(self.generate(url, 'HTTP/2 404\r\n'), {url: {}})


if __name__ == '__main__':
    unittest.main()
