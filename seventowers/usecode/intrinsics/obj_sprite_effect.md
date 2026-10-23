Creates a sprite effect from 'SPRITES.VGA'. This sprite effect is tied to 'obj'; if 'obj' moves, the sprite will move along. 'sprite' is the sprite's shape number, ('rel_x', 'rel_y') is the relative (x, y) offset of the sprite relative to the position of 'obj', ('vel_x', 'vel_y') is the (x, y) speed (i.e., change in coordinates at every tick, and in addition to any motion of 'obj'). 'frnum' is the initial frame of the sprite effect. If 'reps' `< 0`, the sprite effect goes through all frames (at the rate of one frame per tick) and deletes itself; otherwise, 'reps' is the total number of ticks the animation will last before deleting itself, looping the sprite's frames if it is needed.

Displays a graphical effect around a given object. This sprite effect is linked to the object, and will move with it.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object about which the effect will happen. |
| `sprite` | The shape in 'SPRITES.VGA' to be displayed. |
| `rel_x` | The initial horizontal offset from the object at which the sprite will be displayed. |
| `rel_y` | The initial vertical offset from the object at which the sprite will be displayed. |
| `vel_x` | The horizontal speed at which the sprite will move. This is added to the horizontal offset at every tick. |
| `vel_y` | The vertical speed at which the sprite will move. This is added to the vertical offset at every tick. |
| `frame` | The initial frame in 'SPRITES.VGA' of the sprite. This is increased by one every tick, and may loop back to zero when it reaches the last frame (depending on the value of the 'reps' parameter). |
| `reps` | Number of repetitions to execute. If zero, the sprite will be displayed for a tick and then go away. If positive, number of ticks that the sprite will be displayed. If `-1`, the sprite will go through all of its frames **once**. If `-2` the sprite will go through all of its frames until it goes out of screen. If `-3`, the sprite will go through all of its frames **once**, but in reverse order. |
