Plays scripted animated and/or text cutscene after checking whether the files text_info.txt and text.flx exist in the patch folder.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `text` | The base name of the cutscene files. |
| `fade_out` | Optional, default `true`. Controls whether the game fades out to the scene. |
| `fade_in` | Optional, default `true`. Controls whether the game fades back in after the scene. |

The game time queue is paused during an available scene and resumed afterward; an unavailable scene is ignored.
