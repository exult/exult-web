Plays the specified speech track. Blocks until the speech finishes.

> **SI SPECIFIC**
>
> In SI, speech also displays a full-screen face from 'FACES.VGA'.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `track` | Number indicating what speech track is to be played. |

#### Return

Returns `false` if failed to play the requested speech track (for example, if speech is disabled), `true` otherwise.
