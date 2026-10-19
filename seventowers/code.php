<?php
$HEADLINE = "Usecode document";

/*
	 * These values must be passed either by command line
	 * or by a HTTP POST request:
	 *	TITLE_IMAGE (default: "usecodetitle.png")
	 *	DATAFILE (default: "exult_intrinsics.dat")
	 *	OUTPUT = "html" | "text" | "naturaldocs" (default: "html")
	 *	TYPE = 0 | 1 (default: 0)
	 */

include_once "outmode.inc";

$PARAMETERS = array();
if (PHP_SAPI === 'cli' && isset($argv) && is_array($argv)) {
	parse_str(implode('&', array_slice($argv, 1)), $PARAMETERS);
}

if (!isset($PARAMETERS["TITLE_IMAGE"])) {
	$PARAMETERS["TITLE_IMAGE"] = "usecodetitle.png";
}

if (!isset($PARAMETERS["DATAFILE"])) {
	$PARAMETERS["DATAFILE"] = "exult_intrinsics.dat";
}

if (!isset($PARAMETERS["OUTPUT"])) {
	$PARAMETERS["OUTPUT"] = "html";
}

if (!isset($PARAMETERS["TYPE"])) {
	$PARAMETERS["TYPE"] = 0;
}

// Silently correct errors.
$img_regexp = '/\A[A-Za-z0-9_-]+\.png\z/';
if (
	isset($_REQUEST["TITLE_IMAGE"])
	&& is_string($_REQUEST["TITLE_IMAGE"])
	&& preg_match($img_regexp, $_REQUEST["TITLE_IMAGE"])
) {
	$TITLE_IMAGE = $_REQUEST["TITLE_IMAGE"];
} else {
	$TITLE_IMAGE = $PARAMETERS["TITLE_IMAGE"];
}

// Silently correct errors.
$dat_regexp = '/\A[A-Za-z0-9_-]+\.dat\z/';
if (
	isset($_REQUEST["DATAFILE"])
	&& is_string($_REQUEST["DATAFILE"])
	&& preg_match($dat_regexp, $_REQUEST["DATAFILE"])
) {
	$DATAFILE = $_REQUEST["DATAFILE"];
} else {
	$DATAFILE = $PARAMETERS["DATAFILE"];
}

// Silently correct errors.
if (isset($_REQUEST["OUTPUT"]) && is_string($_REQUEST["OUTPUT"])) {
	$OUTPUT = $_REQUEST["OUTPUT"];
} else {
	$OUTPUT = $PARAMETERS["OUTPUT"];
}

// Silently correct errors.
if (isset($_REQUEST["TYPE"]) && is_numeric($_REQUEST["TYPE"])) {
	$TYPE = intval($_REQUEST["TYPE"]);
} else {
	$TYPE = $PARAMETERS["TYPE"];
}

$CUSTOM_PARSE = true;

$modelist = array(
	"html" => OutMode::Html,
	"text" => OutMode::PlainText,
	"naturaldocs" => OutMode::NaturalDocs
);

if (array_key_exists($OUTPUT, $modelist)) {
	$outmode = $modelist[$OUTPUT];
} else {
	$outmode = OutMode::Html;
}

$reference_mode = false;

if ($outmode == OutMode::NaturalDocs) {
	$reverse_titles = true;
} else {
	$reverse_titles = false;
}

include_once "base.inc";
include_once "code.inc";
include_once "usecode/$DATAFILE";

if ($outmode == OutMode::Html) {
	empty_submenubar();
	$tpl->parse("MAIN", "main");
	$tpl->FastPrint();
} else {
	$file = basename($DATAFILE, ".dat");
	$disptype = ($TYPE == 1 ? "attachment" : "inline");
	$content = html_entity_decode($tpl->fetch("CONTENT"));
	$length = strlen($content);
	header("Content-Disposition: $disptype; filename=$file.txt");
	header("Accept-Ranges: bytes");
	header("Content-Length: $length");
	header("Content-type: text/plain");
	print $content;
}
