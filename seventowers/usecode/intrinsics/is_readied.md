Returns '`true`' if an object with shape 'shape' and frame 'frame' is readied in ready spot 'spot' of 'npc', '`false`' otherwise. 'frame' can be the wildcard 'FRAME_ANY'. Valid values for 'spot' are:

For SI, it is better to use '`get_readied`' intrinsic instead.

Checks to see if the given NPC is wearing a piece of equipment on a specified location.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC whose equipment is to be inspected. |
| `spot` | The spot we are checking. |
| `shape` | The shape we are looking for. |
| `frame` | The frame we are looking for. Can be `FRAME_ANY = -359` to match any frame. |

> **BG SPECIFIC**
>
> In BG, the 'spot' parameter is limited to the 0-12 range. It can take any of the following values:
> 
> 
> 
> | Parameter / value | Description |
> | --- | --- |
> | BG_BACKPACK     =  0 | Containers worn on the back, such as backpacks |
> | BG_WEAPON_HAND  =  1 | Item wielded in weapon hand |
> | BG_SHIELD_HAND  =  2 | Off-hand is also called the shield hand |
> | BG_OFF_HAND     =  2 | Item wielded in off-hand |
> | BG_BELT         =  3 | Items worn around the waist such as belts, and girdles |
> | BG_NECK         =  4 | Items worn around the neck such as amulets, and necklaces |
> | BG_TORSO        =  5 | Worn on the torso, such as armor |
> | BG_LEFT_RING    =  6 | Item worn on left finger (ring) |
> | BG_RIGHT_RING   =  7 | Item worn on right finger (ring) |
> | BG_QUIVER       =  8 | Arrows held in quiver |
> | BG_HEAD         =  9 | Items worn on the head such as headbands, helms, etc |
> | BG_LEGS         = 10 | Worn on legs, such as greaves |
> | BG_FEET         = 11 | Worn on feet, such as boots |
> | BG_USECODE      = 12 | Exult-only. Usecode container, used for containing eggs 'carried' by player |
> | BG_CLOAK        = 13 | Exult-only. Items worn around the neck and back such as cloaks and capes |
> | BG_GLOVES       = 14 | Exult-only. Items worn on both hands, such as gloves |
> | BG_TRIPLE_BOLTS = 15 | Special slot used by triple crossbow bolts |
> | BG_EARS         = 16 | Exult-only. Earrings, such as the serpent earrings |
> | BG_BACK_SHIELD  = 17 | Exult-only. Shield slung across the back |
> | BG_BACK_2H      = 19 | Exult-only. Weapon slung across the back |
> | BG_BOTH_HANDS   = 20 | Special slot for item wielded with both hands |
> | BG_LRGLOVES     = 21 | Special slot for item wielded with both ring slots |
> | BG_AMULET       = 22 | Exult-only. Items worn on the neck such as a collar |
> 
> 

> **SI SPECIFIC**
>
> In SI, the 'spot' parameter is limited to the 0-17 range. It can take any of the following values:
> 
> 
> 
> | Parameter / value | Description |
> | --- | --- |
> | SI_OFF_HAND     =  0 | Items wielded in the off-hand |
> | SI_SHIELD_HAND  =  0 | Off-hand is also called shield hand |
> | SI_WEAPON_HAND  =  1 | Items wielded in the weapon hand |
> | SI_CLOAK        =  2 | Items worn around the neck and back such as cloaks and capes |
> | SI_AMULET       =  3 | Items worn on the neck such as a collar |
> | SI_HEAD         =  4 | Items worn on the head such as a helm |
> | SI_GLOVES       =  5 | Items worn on both hands, such as gloves |
> | SI_USECODE      =  6 | Usecode container, used for containing eggs 'carried' by player |
> | SI_RIGHT_RING   =  7 | Ring or item worn on right hand |
> | SI_LEFT_RING    =  8 | Ring or item worn on left hand |
> | SI_EARS         =  9 | Earrings, such as the serpent earrings |
> | SI_QUIVER       = 10 | Arrows held in quiver |
> | SI_BELT         = 11 | Worn across the waist, such as belts and girdles |
> | SI_TORSO        = 12 | Worn on the torso, such as armor |
> | SI_FEET         = 13 | Worn on feet, such as boots |
> | SI_LEGS         = 14 | Worn on legs, such as greaves |
> | SI_BACKPACK     = 15 | Containers worn on the back, such as backpacks |
> | SI_BACK_SHIELD  = 16 | Shield slung across the back |
> | SI_BACK_2H      = 17 | Weapon slung across the back |
> | SI_TRIPLE_BOLTS = 18 | Exult-only. Special slot used by triple crossbow bolts |
> | SI_BOTH_HANDS   = 20 | Special slot for item wielded with both hands |
> | SI_LRGLOVES     = 21 | Exult-only. Special slot for item wielded with both ring slots |
> 
> 

#### Return

Returns `true` if the NPC is wearing an object of the specified shape and frame on the inspected slot, `false` if not.
