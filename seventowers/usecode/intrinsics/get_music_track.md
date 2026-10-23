Gets the music being played.

#### Return

If music is enabled and a song is playing, returns the track number of the current song. Otherwise, return is -1.

> **NOTES ABOUT ORIGINAL BG**
>
> The return value in the original Black Gate was more complicated; the current song was the return value divided by 256, while the next song (the one that would be resumed after the current one ends) was the remainder of that same division. None of this behavior is true for Exult, which works as described above.
