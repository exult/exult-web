UI_execute_usecode_array
	(
	item,
	[0x46, 0x0000, 0x4E, 0x01, 0x58, 0x0006, 0x0B, 0xFFFC, 0x0020, 0x55, 0x0105]
	);
direction = getDirectionDirectionToObject(AVATAR, item);
UI_execute_usecode_array
	(
	AVATAR,
	[0x59, direction, 0x01, 0x67, 0x61, 0x27, 0x0001, 0x0B, 0xFFFB, 0x0009]
	);