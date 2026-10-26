Prints formatted text to 'stdout'.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `out` | An array whose first element is the format string, followed by the values to print. Integers and other usecode values are also accepted as substitutions. The format string gives the basic text, and has a placeholder for each of the other elements of the array; each element past the first writes its text at the next available placeholder. Placeholders are the '%s' sequence, without the single quotes, embedded in the format string. |

#### Return

An empty string.
