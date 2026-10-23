Inspects the chosen flag of the given object.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose flag we wish to inspect. Not all flags are available for all objects. |
| `flag` | What we want to know. This is a number in the 0 to 63 range. |

The flag parameter is a numeric value describing a (usually boolean) bit of information about the object in question. Valid pre-defined values for the flag are:

| Parameter / value | Description |
| --- | --- |
| INVISIBLE           = 0 | Object is invisible (rendered with 'invisible' palette, or not at all). |
| ASLEEP              = 1 | Object is asleep. Only really useful for NPCs. |
| CHARMED             = 2 | Object is charmed (attacks allies). Only really useful for NPCs. |
| CURSED              = 3 | Object is cursed (stats malus). Only really useful for NPCs. |
| DEAD                = 4 | Object is dead. Only really useful for NPC/monster. *DONT set on dead bodies, causes bugs.* |
| IN_PARTY            = 6 | Object is an NPC in the party. |
| PARALYZED           = 7 | Object is paralyzed and unable to move. Normal objects will be stationary by default. |
| PARALYSED           = 7 | Canadian/British spelling. |
| POISONED            = 8 | Object is afflicted with poison. Can be set on objects, but will only do anything to NPCs. |
| PROTECTION          = 9 | Object is protected from harm. Only really useful for NPCs. |
| ON_MOVING_BARGE    = 10 | Object is on a 'barge' object that is moving. |
| OKAY_TO_TAKE       = 11 | Object will not trigger stealing usecode if you take it. |
| MIGHT              = 12 | Object has might (Stats boon).  Only really useful for NPCs. |
| IMMUNITIES         = 13 | Object has several immunities. Can be inspected only. |
| CANT_DIE           = 14 | Object can't die. Used for testing purposes, and certain critical NPCs (such as L.B.). Can be inspected only. |
| IN_ACTION          = 15 | Object is executing the usecode called by the Dance spell. |
| DONT_MOVE          = 16 | SI: The NPC cannot move. |
| DONT_RENDER        = 16 | BG: The NPC cannot move, and is not rendered at all. |
| SI_ON_MOVING_BARGE = 17 | SI: Object is on a special instance of the SI barges. (Turtle for example.) |
| TEMPORARY          = 18 | Object is temporary and will decay once the chunk it is in is un-cached. |
| ACTIVE_SAILOR      = 20 | Object is the 'captain' of a barge.  When getting the flag, you will actually get the current captain. |
| OKAY_TO_LAND       = 21 | Set in usecode for flying carpet, TRUE if you can land currently. |
| BG_DONT_MOVE       = 22 | BG: BG's version of DONT_MOVE. |
| SI_DONT_RENDER     = 22 | SI: SI's version of DONT_RENDER. |
| IN_DUNGEON         = 23 | If set on PC or an NPC, they won't trigger the stealing usecode if they take food objects. |
| IS_SOLID           = 24 | Used by gangplank usecode to determine if an object is solid. |
| CONFUSED           = 25 | This will be set if the avatar failed copyright protection questions in SI. Only really meaningful used on the avatar. |
| ACTIVE_BARGE       = 26 | Object is a barge object moving, or on a barge object that is moving. Set in usecode, and mostly used for the SI 'NPC' ships such as the turtle. |
| MET                = 28 | Object has been talked to previously. Should be set in a conversation Usecode script. This determines conversation behavior, and whether the NPC's real name or shape name is displayed when they are single-clicked on. BG originally used global flags for this, which amounts to an extra 250-odd flags. What a waste of time. |
| SI_TOURNAMENT      = 29 | Literal plot immunity: the NPC can die only if the plot allows it. If enough damage is taken in a single blow, the object will call usecode (eventid = 7) on death. Used for the List Field in SI. |
| SI_ZOMBIE          = 30 | Object will not respond to normal cues. Used for sick Neyobi, insane party members/Cantra. |
| NO_SPELL_CASTING   = 31 | Object cannot cast spells. Set when the magebane strikes the object. |
| POLYMORPH          = 32 | Object is polymorphed. |
| TATTOOED           = 33 | Object has been tattooed. Set after the lady tattoos you by usecode. Causes the avatar portraits to use a different 'tattooed' shape num. |
| READ               = 34 | Object can read serpent- or rune-script text. Only really meaningful used on the avatar. |
| PETRA              = 35 | Object has switched bodies with Petra. This changes the portraits of NPCs according to a list in the 'avatar_data.txt' file. Only really meaningful for NPCs in that list. |
| FLIGHT             = 36 | Object can fly. Only really useful for NPCs. |
| FREEZE             = 37 | Object is freezing. Only really useful for NPCs. |
| NAKED              = 38 | Object is naked. On the avatar, causes him/her to use the appropriate 'naked' shape. On other NPCs there no effect. To actually make NPCs naked, use set_polymorph instead. |

#### Return

For most flags, `true` if the flag is set (that is, in effect), `false` otherwise. There is one exception, however: The 'ACTIVE_SAILOR' and 'ACTIVE_BARGE' flags have a peculiar behavior in that they actually returns an object reference to the last object to have that flag set, or zero if no object has been set, or if the flag has been cleared with '`clear_item_flag`' intrinsic for the given flag.

With the exception of the OKAY_TO_TAKE, TEMPORARY and INVISIBLE flags, these flags are valid for NPCs only. You can get, set or clear any of those values and Exult will not complain; however, it will also not save the values of the flags except for the three mentioned before. Moreover, the INVISIBLE flag will not be saved for objects unless they are of 'quality flags' class.
