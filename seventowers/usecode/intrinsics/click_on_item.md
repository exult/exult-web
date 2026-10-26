Displays the targeting square and waits for the player to click on something.

#### Return

An array with 4 elements. The first element is the object clicked, or zero if the player clicked a tile; the remaining 3 elements make up the (x, y, z) location of the object or tile clicked.

If used after a '`set_intercept_item`' intrinsic call, the preassigned object or tile is returned in the same manner as if the player had clicked it.

This intrinsic has a special case: when `event == WEAPON` (weapon hit), and if `item` is a valid object, the return will be overridden to be it (although a '`set_intercept_item`' intrinsic call takes precedence over this special case).

If the player cancels the selection, the return is zero instead of a four-element array. A pending `UI_set_intercept_item` selection is consumed before asking for a click; during a weapon event, the caller object can supply the target automatically.
