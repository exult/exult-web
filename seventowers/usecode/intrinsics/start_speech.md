Plays the specified speech track.

> **SI SPECIFIC**
>
> In SI, tracks 0-20 show the Balance Serpent's portrait (solid when wearing the serpent ring, translucent otherwise), tracks 21-22 show the Guardian, tracks 23-24 show Arcadion, and tracks 25-26 show the Chaos and Order Serpents respectively. These portraits wait for a click before being removed; other tracks do not select a portrait here.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `track` | Number indicating what speech track is to be played. |

#### Return

Returns `true` for a non-negative track number and `false` for a negative track number. This does not report whether audio was actually available or played. The requested number is stored for `UI_get_speech_track`; a negative number also reinitializes the conversation.
