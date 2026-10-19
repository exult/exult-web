<?php
// Run with: php seventowers/tests/reference_requests.php
if (PHP_SAPI !== 'cli') {
	http_response_code(404);
	exit;
}

// Each request needs a fresh process because the pages define global functions.
function render_request($page, $request) {
	$source = 'chdir(' . var_export(dirname(__DIR__), true) . ');'
		. '$_SERVER["PHP_SELF"] = ' . var_export("/seventowers/$page", true) . ';'
		. '$_REQUEST = ' . var_export($request, true) . ';'
		. 'include ' . var_export($page, true) . ';';
	$process = proc_open(
		// The bundled legacy template engine emits deprecations on current PHP.
		array(PHP_BINARY, '-d', 'display_errors=stderr', '-d', 'error_reporting=' . (E_ALL & ~E_DEPRECATED), '-r', $source),
		array(1 => array('pipe', 'w'), 2 => array('pipe', 'w')),
		$pipes
	);
	$output = stream_get_contents($pipes[1]);
	$errors = stream_get_contents($pipes[2]);
	fclose($pipes[1]);
	fclose($pipes[2]);
	$status = proc_close($process);
	if ($status !== 0 || $errors !== '') {
		throw new RuntimeException("$page failed ($status): $errors");
	}
	return $output;
}

function check($condition, $message) {
	if (!$condition) {
		throw new RuntimeException($message);
	}
}

$payload = '"><Img Src=OnXSS OnError=confirm(3)>';
$count = 0;
foreach (array(3, 5, 6, 50, 0, 999) as $type) {
	foreach (array($payload, '../reference/intrinsic_reference', '..\\reference\\intrinsic_reference', 'php://filter/resource=index', "obj_sprite_effect\0", "obj_sprite_effect\n", array('obj_sprite_effect')) as $name) {
		$html = render_request('ucc_ref.php', array('DATAFILE' => $name, 'TYPE' => $type));
		check(stripos($html, 'Error: File Not Found') !== false, "Invalid reference accepted for TYPE=$type");
		check(stripos($html, '<img src=OnXSS') === false, 'XSS payload became markup');
		if ($name === $payload) {
			check(strpos($html, '&lt;Img Src=OnXSS OnError=confirm(3)&gt;') !== false, 'Error path was not HTML escaped');
		}
		$count++;
	}
}

check(stripos(render_request('ucc_ref.php', array()), 'Error: File Not Found') !== false, 'Missing DATAFILE failed');
$count++;
foreach (array(
	array(5, 'obj_sprite_effect', 'Creates a sprite effect'),
	array(5, 'UI_obj_sprite_effect', 'Creates a sprite effect'),
	array(3, 'wait', 'SCRIPT COMMANDS'),
	array(6, '#include', 'COMPILER DIRECTIVES'),
	array(6, '#', 'COMPILER DIRECTIVES'),
	array(50, 'intrinsic_reference', 'USECODE INTRINSIC REFERENCE DEFINITIONS'),
	array(0, 'obj_sprite_effect', 'Creates a sprite effect'),
	array(array('5'), 'obj_sprite_effect', 'Creates a sprite effect'),
) as $case) {
	$html = render_request('ucc_ref.php', array('TYPE' => $case[0], 'DATAFILE' => $case[1]));
	check(strpos($html, $case[2]) !== false, 'Valid reference did not render: ' . $case[1]);
	check(stripos($html, 'Error: File Not Found') === false, 'Valid reference rejected');
	$count++;
}

foreach (array(
	array('DATAFILE' => array('exult_intrinsics.dat')),
	array('TITLE_IMAGE' => array('usecodetitle.png')),
	array('OUTPUT' => array('html')),
	array('DATAFILE' => "exult_intrinsics.dat\n", 'TITLE_IMAGE' => "usecodetitle.png\n"),
	array('DATAFILE' => '../content/home.dat'),
	array('DATAFILE' => $payload, 'TITLE_IMAGE' => $payload),
	array('OUTPUT' => 'text'),
	array('OUTPUT' => 'naturaldocs'),
) as $request) {
	$output = render_request('code.php', $request);
	check(strpos($output, 'UI_') !== false, 'Document failed to render');
	check(stripos($output, '<img src=OnXSS') === false, 'Document reflected markup');
	$count++;
}
echo "Passed $count request regression checks.\n";
