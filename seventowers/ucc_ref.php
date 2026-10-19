<?php
/* ++++ These vars must be filled from the calling page
		$DATAFILE = "resurrect";
		$TYPE = 5;
	//*/
$TITLE_IMAGE = "uccreftitle.png";
$HEADLINE = "UCC Reference";

$DATAFILE = "";
$valid_datafile = !isset($_REQUEST["DATAFILE"]) || is_string($_REQUEST["DATAFILE"]);
if (isset($_REQUEST["DATAFILE"]) && $valid_datafile) {
	$DATAFILE = $_REQUEST["DATAFILE"];
}

// Silently correct errors.
if (isset($_REQUEST["TYPE"]) && is_numeric($_REQUEST["TYPE"])) {
	$TYPE = intval($_REQUEST["TYPE"]);
} else {
	$TYPE = 5;
}

// Only these reference categories have data files.
if (!in_array($TYPE, array(3, 5, 6, 50), true)) {
	$TYPE = 5;
}

$CUSTOM_PARSE = true;

include_once "base.inc";
include_once "code.inc";

$htmlmode = true;

$reference_mode = true;

switch ($TYPE) {
	case 3:
		$data = "scriptop/$DATAFILE";
		$head = "Script Commands";
		$relations = "script commands";
		$relation_data = 0;
		include_once "usecode/reference/opcode_relations.dat";
		break;
	case 6:
		$DATAFILE = preg_replace("/^#/", "", $DATAFILE);
		if (strlen($DATAFILE) == 0) {
			$DATAFILE = "line";
		}
		$data = "directives/$DATAFILE";
		$head = "Compiler Directives";
		$relations = "";
		$seealso = 0;
		$relation_data = 0;
		break;
	case 50:
		$data = "reference/$DATAFILE";
		$head = "Usecode Intrinsic Reference definitions";
		$relation_data = 0;
		break;
	case 5:
	default:
		$DATAFILE = preg_replace("/^UI_/", "", $DATAFILE);
		$data = "intrinsics/$DATAFILE";
		$proto = "intrinsics/defs/$DATAFILE";
		$head = "Usecode Intrinsics";
		$relations = "intrinsics";
		$seealso = array(
			add_link("Usecode Intrinsic Reference definitions", "ucc_ref.php?TYPE=50&amp;DATAFILE=intrinsic_reference"),
			add_link("Full Usecode Intrinsic Reference", "code.php?TITLE_IMAGE=usecodetitle.png&amp;DATAFILE=exult_intrinsics.dat"),
		);
		include_once "usecode/reference/intrinsic_relations.dat";
		break;
}

// A reference name is a single basename, never a path or a stream URL.
if (!$valid_datafile || !preg_match('/\A[A-Za-z0-9_-]+\z/', $DATAFILE) || !is_file("usecode/$data.dat")) {
	make_header("Error: File Not Found");
	$display_path = htmlspecialchars("usecode/$data.dat", ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
	$tpl->assign("TEXT", "File \"$display_path\" was not found on the server.<br/>Please avoid using direct links to this website unless from a bookmarked page.");
	$tpl->parse("CONTENT", ".any");
} else {
	$ucc = add_tip("UCC", "Usecode C");
	$bgimg = add_image("bgsm.png", "[BG]", false);
	$siimg = add_image("sism.png", "[SI]", false);
	$exultimg = add_image("exultsm.png", "[Exult]", false);
	$exultbgimg = add_image("exultbgsm.png", "[Exult: BG]", false);
	$exultsiimg = add_image("exultsism.png", "[Exult: SI]", false);
	$bgexultimg = add_image("bgexultsm.png", "[BG, Exult]", false);
	$siexultimg = add_image("siexultsm.png", "[SI, Exult]", false);
	$true = inline_code("true");
	$false = inline_code("false");
	$exult = add_link("Exult", "http://exult.info/");

	make_header($head);
	if ($TYPE == 5) {
		include_once "usecode/$proto.dat";
	}
	include_once "usecode/$data.dat";
	if (isset($relation_data) && is_array($relation_data) && count($relation_data) > 0) {
		$list = array();
		foreach ($relation_data as $reldata) {
			if (array_key_exists($DATAFILE, $reldata)) {
				$list = $reldata[$DATAFILE];
				break;
			}
		}
		if (count($list) > 0) {
			$listout = array();
			foreach ($list as $key => $item) {
				if ($item !== $DATAFILE) {
					$listout[] = inline_code($item);
				}
			}
			if (!empty($listout)) {
				make_header("Related $relations", false);
				add_list($listout, true, 0);
			}
		}
	}

	if (isset($seealso) && is_array($seealso) && count($seealso) > 0) {
		make_header("See also", false);
		add_list($seealso, true, 0);
	}
}
empty_submenubar();
$tpl->parse("MAIN", "main");
$tpl->FastPrint();
