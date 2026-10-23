Displays the selected gump on screen and prints lines of runic text on-screen. What font is used to draw the text depends on the gump shown, and is currently hard-coded (as of 2009/02/26).

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `gump` | The shape in 'GUMPS.VGA' that will be used. |
| `runes` | An array containing one element per line of runes to display. |

If the avatar's `READ` flag is set, some symbols are converted into pairs of letters. Specifically:

| Parameter / value | Description |
| --- | --- |
| ( | TH |
| ) | EE |
| * | NG |
| + | EA |
| , | ST |

Additionally, all lowercase letters will be turned into uppercase letters, and pipes ('|') will be converted to spaces.

When compiling code, UCC accepts some escape sequences to make these strings easier to read:

| Parameter / value | Description |
| --- | --- |
| ( | \{th} |
| ) | \{ee} |
| * | \{ng} |
| + | \{ea} |
| , | \{st} |
| &#124; | \{dot} |
