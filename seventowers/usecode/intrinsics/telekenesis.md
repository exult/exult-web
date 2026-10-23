Deprecated; stores a usecode function for special script behavior. The next **script** call to the stored function (e.g., '`script item call fun;`') will have an event ID of 'DOUBLECLICK' instead of the standard 'SCRIPTED' event ID used for scripts. Since Usecode C scripts allow calling a function with an event ID of your choice (e.g., '`script item call fun, DOUBLECLICK;`') it is best to simply ignore this intrinsic.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `fun` | The function to be stored. |
