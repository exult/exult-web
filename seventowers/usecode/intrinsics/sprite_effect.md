Displays a graphical effect at the given location.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `sprite` | The shape in 'SPRITES.VGA' to be displayed. |
| `x` | The initial horizontal location at which the sprite will be displayed. |
| `y` | The initial vertical location at which the sprite will be displayed. |
| `vel_x` | The horizontal speed at which the sprite will move. This is added to the location at every tick. |
| `vel_y` | The vertical speed at which the sprite will move. This is added to the location at every tick. |
| `frame` | The initial frame in 'SPRITES.VGA' of the sprite. This is increased by one every tick, and may loop back to zero when it reaches the last frame (depending on the value of the 'reps' parameter). |
| `reps` | Number of repetitions to execute. If zero, the sprite will be displayed for a tick and then go away. If positive, number of ticks that the sprite will be displayed. If `-1`, the sprite will go through all of its frames **once**. If `-2` the sprite will go through all of its frames until it goes out of screen. If `-3`, the sprite will go through all of its frames **once**, but in reverse order. |
