Plays scripted animated and/or text cutscene after checking whether the files text_info.txt and text.flx exist in the patch folder.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `text` | The base name of the cutscene files. |
| `fade_out` | Controls whether the game fades out to the scene. Pass `true` explicitly to enable fading. |
| `fade_in` | Controls whether the game fades back in after the scene. Pass `true` explicitly to enable fading. |

The implementation specifies `true` fallbacks for omitted fade arguments, but the current dispatcher pads them with zero, so omitting them disables the fades. The game time queue is paused during an available scene and resumed afterward; an unavailable scene is ignored.
