Creates an egg object at the specified location. Eggs are invisible trigger objects that activate under certain conditions.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `type` | The egg type (1-11). This also determines the egg's shape and frame: 1=monster, 2=jukebox, 3=soundsfx, 4=voice, 5=usecode, 6=missile, 7=teleport, 8=weather, 9=path, 10=button, 11=intermap |
| `pos` | The location where the egg is to be placed (same format as `UI_create_new_object2`). |
| `criteria` | Activation criteria (0-7): 0=cached_in, 1=party_near, 2=avatar_near, 3=avatar_far, 4=avatar_footpad, 5=party_footpad, 6=something_on, 7=external_criteria |
| `probability` | Probability of activation (1-100). |
| `distance` | Activation distance (0-31). |
| `flags` | Egg flags as a bitmask. Bit 0: nocturnal (only activates at night), Bit 1: once (only activates once), Bit 2: hatched (egg has already been triggered), Bit 3: auto_reset (can trigger again after hatching) |
| `data` | An array of type-specific data (see below). A single value can also be passed for types that only need one element. |

#### Return

An object reference to the newly created egg, or a null object reference if creation fails. On success, the egg is placed using `UI_update_last_created(pos)` and removed from the last-created stack.

#### Notes

All seven arguments are required by this intrinsic. The `data` array uses one-based Usecode indices. Missing data elements default to zero, and only the first five elements are read. The data is encoded internally as follows:

| Parameter / value | Description |
| --- | --- |
| Monster (1): [shape, frame, count, schedule, alignment] | `data[1]` = monster shape number, `data[2]` = monster frame number, `data[3]` = spawn count, `data[4]` = schedule type (0=combat, 1=horiz_pace, 2=vert_pace, etc.), `data[5]` = alignment (0=neutral, 1=good, 2=evil, 3=chaotic) |
| Jukebox (2): [song, continuous] | `data[1]` = music track number, `data[2]` = continuous (0=play once, 1=loop) |
| Soundsfx (3): [sfx_num, continuous] | `data[1]` = sound effect number, `data[2]` = continuous (0=play once, 1=loop) |
| Voice (4): [speech_num] | `data[1]` = speech number |
| Usecode (5): [usecode_fun, quality] | `data[1]` = usecode function number (or function name), `data[2]` = quality |
| Missile (6): [shape, direction, delay] | `data[1]` = missile shape number, `data[2]` = direction (0-7 for compass directions, 8 for party member), `data[3]` = delay |
| Teleport (7): [dest_x, dest_y, dest_z] or [egg_num] | If `data[2]` and `data[3]` are zero (including missing elements), and `data[1]`<256: `data[1]` = path egg number. Otherwise: `data[1]` = X, `data[2]` = Y, `data[3]` = Z (lift) |
| Weather (8): [weather_type, duration] | `data[1]` = weather type (0=halt/normal, 1=snow, 2=storm, 3=sparkle, 4=fog, 5=overcast, 6=clouds), `data[2]` = duration |
| Path (9): [path_num] | `data[1]` = path egg quality number |
| Button (10): [distance] | `data[1]` = distance (triggers nearby external_criteria eggs) |
| Intermap (11): [dest_x, dest_y, dest_z, mapnum] | `data[1]` = X, `data[2]` = Y, `data[3]` = Z (lift), `data[4]` = map number |

> **CURRENT SOURCE LIMITATION**
>
> The implementation in `usecode/intrinsics.cc` requires exactly seven arguments. The current `Usecode_internal::call_intrinsic` dispatcher in `usecode/ucinternal.cc` pads every call to at least 13 arguments before passing it to the implementation. As a result, calls from usecode fail the argument-count check and return a null object reference in this source revision. The parameter descriptions above describe the creation code after that check.
