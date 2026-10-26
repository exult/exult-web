Changes an object's or NPC's property by the specified value. Despite the name, this intrinsic can also be called for any object, although most properties will be unavailable for anything but NPCs.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object or NPC whose property is to be changed. |
| `prop` | String or integer specifying the property to be changed. |
| `delta` | The desired numeric **change** in the specified property. |

If the desired property has been specified as an integer, it must be one of the values listed in the `UI_get_npc_prop` intrinsic description. The following values are special cases:

| Parameter / value | Description |
| --- | --- |
| `HEALTH` | This is the only meaningful property for non-NPC objects. Changes the remaining hit points of the object or NPC. If the remaining hit points become zero, an object will become **indestructible**. |
| `EXPERIENCE` | This property is changed by *half* of the specified value. A negative value in the signed 16-bit range is first reinterpreted as unsigned, to handle experience bonuses stored by the original games; more negative values are ignored. |
| `SEX_FLAG` | A nonzero 'delta' sets the NPC to female, while a zero 'delta' sets the NPC to male. |
| `MISSILE_WEAPON` | Nothing happens when this property value is supplied. |

> **BG SPECIFIC**
>
> In the original BG, you could not set the sex flag except by hex-editing the game data. Exult does not suffer from this limitation.

If the desired property has been specified as a string, it will be created if it does not exist; its initial value is assumed to be zero in this case. Only NPCs can have such properties, and they will be displayed in the NPC's stats window.

#### Return

Returns `1` for a valid NPC, or when changing `HEALTH` on a valid non-NPC object. Returns `0` for an invalid object or a property that is unavailable on a non-NPC object. A result of `1` means the request was accepted; it does not guarantee that the property changed.
