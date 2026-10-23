#! /bin/sh
 #  gen-snapshot-file-details.sh - Script to prefetch Snapshot File Details from sourceforge for download page
 #
 #  Copyright (C) 2025 The Exult Team
 #
 #  This program is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or
 #  (at your option) any later version.
 #
 #  This program is distributed in the hope that it will be useful,
 #  but WITHOUT ANY WARRANTY; without even the implied warranty of
 #  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 #  GNU General Public License for more details.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 
if [ "$#" -eq 0 ]; then
  set -- download.html
  if [ -d dist/seventowers ]; then
    set -- "$@" dist/seventowers/*.html
  fi
fi

{
  printf 'var static_snapshot_file_details = {\n'
  grep -h -o "https://exult.sourceforge.io/snapshots/[^\"]*" "$@" | sort -u | while IFS= read -r p; do
    # Headers are external data. Serialize both keys and values as JSON rather
    # than interpolating them into JavaScript string literals.
    curl --silent --show-error --head "$p" | python3 -c '
import json
import sys

headers = {}
for line in sys.stdin:
    name, separator, value = line.partition(":")
    name = name.lower()
    if separator and name in ("content-length", "last-modified"):
        headers[name] = value.strip()
print("  " + json.dumps(sys.argv[1]) + ": " + json.dumps(headers) + ",")
' "$p"
  done
  printf '};\n'
} | tee shapshot_file_details.js
