Gets the name of one or more objects. Despite the name, this intrinsic can be called for any object, not just NPCs; for non-NPCs, the return is the text displayed when you click the object.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object, or array of objects, whose names are desired. |

#### Return

If the input is an array of objects, the return is an array with the names of these objects. Valid names retain their input order, but invalid objects are omitted, so the output array may be shorter than the input.

Otherwise, the return is the name of the given object, or `"??name??"` for an invalid object.
