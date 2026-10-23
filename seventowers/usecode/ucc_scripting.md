## Usecode C Scripts and execute_usecode_array intrinsic

### About this document

This document can be freely distributed as long as its kept mostly intact. Any spelling mistakes can be corrected, but I'd appreciate being notified about them so the quality of the document can be improved...

A lot of the information in this file comes from the Exult source code, specifically from the 'ucparse.yy' and 'ucscriptop.h' files. Any errors are likely my fault, though.

For the most part, this document is a reference for Usecode C scripting commands and for the commands of '`execute_usecode_array`' and '`delayed_execute_usecode_array`'. I give a few examples of each syntax and I give a small guide about how to convert from '`execute_usecode_array`' calls to Usecode C scripts for readability and ease of extension.

Any suggestions will be appreciated!

### About Usecode C Scripting and the execute_usecode_array intrinsic

'`execute_usecode_array`' and Usecode C scripts are both used to generate scripted animations in Ultima VII/<abbr title="Serpent Isle">SI</abbr>/Exult. They are responsible for the moongates from the Orb of the Moons rising out of the ground, swirl around for a while and sink back into the ground, for example, as well as the scene with Frigidazzi. Item iteractions also tipically have such animations, so it is a good idea to learn a bit of scripting/'`execute_usecode_array`' if you plan on working with usecode.

It is a good idea to also learn how to convert from '`execute_usecode_array`' to Usecode C scripts since the latter are much more readable than the former...for example, in Erethian's usecode (from <abbr title="Forge of Virtue">FoV</abbr>) has the following '`execute_usecode_array`' call:


```usecode
UI_execute_usecode_array
    (
    item,
    [0x6F, 0x27, 0x0001, 0x01, 0x52, "@An Ailem!", 0x27, 0x0003, 0x70, 0x27, 0x0006]
    );
```

It is far from obvious what it actually does. Fortunately, we have an alternative to using the '`execute_usecode_array`' intrinsic: Usecode C has a set of scripting functions which are converted to '`execute_usecode_array`' calls upon compilation. The good point is that Usecode C scripts are much more readable and understandable than '`execute_usecode_array`' calls, which only helps writing new usecode.

### Script Blocks and Commands

A bit of nomenclature, for convenience: I will use 'opcode' to mean an element of an usecode array which determines what is to be done; all other elements of the usecode array will be called 'parameters'. An opcode with all its needed parameters will be called a 'command'.

Script blocks also have commands; they are related to opcodes, but there are more opcodes (barely) than there are script commands. I will use 'script commands' (or simply 'commands' when there is no ambiguity) to mean commands from script blocks as opposed to opcodes + parameters.

The basic syntax of a script block is:


```usecode
script item opt_script_delay script_command
```

(note to those who already know Usecode C: I have included the ';' in the definition of script_command, so including it above would cause a compile error) for a block with a single command, or


```usecode
script obj opt_script_delay {script_command_list};
```

for blocks with one or more commands. In both cases, we have that:

- `obj` can be any object or NPC and is **required**;
- `opt_script_delay` is an optional delay in ticks, and has syntax 'after XX ticks', with XX being the delay in ticks;
- `script_command` is a (script) command which MUST terminate in a ';';
- `script_command_list` is a list of one or more script_commands, each of which MUST have a terminating ';'.

Also in both cases, spaces, tabs and line breaks between commands (but not **within** a command - there must be at least one tab or space between the root and parameters and between parameters) are ignored. It is good practice then (and helps readability of the code) if you add spaces and identation to clearly delineate each command.

Time now for the commands of the script block. There is (<abbr title="As Far As I Know">AFAIK</abbr>) no real table of commands other than what can be gleaned from the ucparse.yy file from the Exult source. For this reason, I went through the trouble of compiling the following list and explaining what they do:

### <a id="table1"></a>Table 1: Usecode C Script Commands

| **COMMAND** | **OPCODE** | **DESCRIPTION** |
| --- | --- | --- |
| `continue;` | `0x01` | Continues script without painting |
| `reset;` | `0x0a` | Resets the script back to the start. Be careful of using this with the nohalt opcode. Also, repeat will only work the first time around. |
| `repeat int_exp script_command;` | `0x0b, 0x0c` | Executes the command(s) in script_command and then repeats them a number of times equal to int_exp |
| `repeat int_exp, int_exp script_command;` | `0x0c` | Executes the command(s) in script_command and then repeats them a number of times equal to the first int_exp, resetting counter to the second int_exp when the counter reaches 0 |
| `nop;` | `0x21` | Does nothing |
| `nohalt;` | `0x23` | Script cannot be halted by UI_halt_scheduled and does not prevent the actor from moving on its own |
| `wait while near int_exp;` | `0x24` | Stays on this opcode until the avatar gets further than int_exp tiles from the script object |
| `wait int_exp;` | `0x27` | Waits int_exp ticks |
| `wait int_exp minutes;` | `0x28` | Waits int_exp minutes |
| `wait int_exp hours;` | `0x29` | Waits int_exp hours |
| `wait while far int_exp;` | `0x2b` | Stays on this opcode until the avatar gets closer than int_exp tiles from the script object |
| `finish;` | `0x2c` | Finishes script if item is killed? |
| `remove;` | `0x2d` | Deletes item and halts the script |
| `descent;` | `0x38` | Decreases lift (z coordinate) by 1 |
| `rise;` | `0x39` | Increases lift (z coordinate) by 1 |
| `frame int_exp;` | `0x46` | Sets the frame for item to int_exp |
| `actor frame int_lit;` | `0x61+int_lit` | Sets the frame for an NPC and keeps facing the same direction* |
| `hatch;` | `0x48` | If item is an egg, activates it |
| `setegg int_exp, int_exp;` | `0x49` | Changes an egg's activation conditions. The first int_exp sets the criteria, the second sets the distance |
| `next frame;` | `0x4d` | Increases current frame by 1, stops at maximum |
| `next frame cycle;` | `0x4e` | Increases current frame by 1, wrap to 0 at max |
| `previous frame;` | `0x4f` | Decreases current frame by 1, stops at 0 |
| `previous frame cycle;` | `0x50` | Decreases current frame by 1, wrap to max at 0 |
| `say text_exp;` | `0x52` | Actor says text_exp |
| `step int_exp[, opt_int_exp];` | `0x53` | Steps in direction specified by int_exp, with a delta-z optionally specified by opt_int_exp (assumed zero if missing)** |
| `step dir;` | `0x30+dir` | Steps in direction specified by dir*** |
| `music int_exp;` | `0x54` | Plays music number int_exp |
| `call fun;` | `0x55` | Calls function fun with event = 2**** |
| `call fun, int_lit;` | `0x80` | Calls function fun with event = int_lit**** |
| `speech int_exp;` | `0x56` | Plays speech track number int_exp |
| `sfx int_exp;` | `0x58` | Plays sound effect number int_exp |
| `face int_exp;` | `0x59` | Turns to face direction int_exp** |
| `weather int_exp;` | `0x5a` | Sets weather type to int_exp |
| `hit int_exp;` | `0x78` | Item attacked, loses int_exp hits |
| `attack;` | `0x7a` | Attacks using information from previous '`set_to_attack`' intrinsic call |
| `resurrect;` | `0x81` | Brings actor back to life |

| * | For the actor frame int_lit, Usecode C will convert int_lit will into a value between 0-15, so you may want to stick to these values. |
| --- | --- |
| ** | north = 0, northeast = 1, east = 2, etc. up to northwest = 7 |
| *** | dir can be one of the following: north, ne, east, se, south, sw, west, nw |
| **** | A few common values for event:<br>- 0: Object on-screen or nearby, called every few seconds<br>- 1: Object is double-clicked<br>- 2: Scripted, triggered by usecode<br>- 3: Egg event<br>- 4: Object is used as a weapon<br>- 5: An item is readied (worn)<br>- 6: An item is unreadied (removed)<br>- 7: Died (<abbr title="Serpent Isle">SI</abbr> only?)<br>- 9: When an NPC wants to talk to you (<abbr title="Serpent Isle">SI</abbr> only)<br><br> |

(yes, the ';'s are required) For future convenience, I've added an opcode equivalence for all commands. The parameters on the table have the following meanings:

- int_lit: Any number;
- int_exp: Any number or expression that evaluates to a number (such as constants or even functions);
- text_exp: Any string or constant string;
- fun: Any function name or number;
- script_command: for repeat, a list of one or more commands terminating in a ';'. For more than one command, script_command MUST be enclosed in clurly braces '{' and '}'.

As far as script blocks go, that is it. There are a few opcodes with no equivalence to Usecode C scripts (but we can bug the Exult devs to include in the future ;-)), but I will defer these to a later section.

To help fix the ideas above, a few exemples are in order:

Orb of the Moons' Moongate animation (the item moongate is assumed to exist). View all frames of shape 779 in Exult Studio to fully see what this script does. This script is slightly different from the original one in <abbr title="Black Gate">BG</abbr>.


```usecode
script moongate
{
    //Set the initial frame (when it first appears in the ground):
    frame 0;

    //The moongate has 12 frames (0-based); go through them all:
    repeat 10 next frame cycle;;
    //Note that there are TWO ";" in the above statement; one is from the
    //repeat, while the other is from the command. Also, it is important
    //to note that repeat will execute the commands once and then *repeat*
    //them the specified number of times.

    //The moongate has fully risen, so now it is time to animate it;
    //frames 4 to 11 can be cycled continuously.

    //We will display the full cycle 5 additional times:
    repeat 5
    {
        //Return to the starting frame of the cycle:
        frame 4;

        //Go through each frame of the animation. It is done this way
        repeat 5    next frame cycle;;
    };

    //Now time to make the moongate disappear; return to the first
    //standing frame:
    frame 4;

    //Decrement the frame until frame 0, which is when the moongate is
    //about to vanish:
    repeat 3 previous frame cycle;;

    //Delete the moongate, making it vanish:
    remove;
}
```

Loom animation. This is the animation of the loom and of the avatar when you double-click a thread then target the loom. The loom is shape 261. This example uses function `0x827`, which has been aliased as getDirectionDirectionToObject.


```usecode
script item            //item is the loom
{
    //Set the initial frame:
    frame 0;

    //Repeat the following commands 32 times each in sequence.
    //The loom has 16 frames; starting from frame zero, every
    //16 repeats returns the loom to frame zero; so the cycle
    //ends in frame zero.
    repeat 32
    {
        next frame cycle;
        continue;
        sfx 6;
    };

    //After all the above is done, call again the Loom function
    //to create the cloth:
    call Loom;        //Loom function # is 261 = 0x0105
}

//Determine which way the avatar must face:
direction = getDirectionDirectionToObject(AVATAR, item);

script AVATAR
{
    //Turn the avatar to the appropriate direction:
    face direction;

    //The "looming" animation of the avatar, repeated
    //nine times.
    repeat 9
    {
        continue;
        actor frame 6;
        actor frame 0;
        wait 1;
    };
}
```

### Translating From execute_usecode_array calls to Usecode C Scripts

Time now to go about understanding '`execute_usecode_array`' calls. The best way to do that is, unsurprisingly, to convert them to script blocks. I will now list the all the opcodes and give them friendly pseudo-names taken from 'ucscriptop.h'.

### <a id="table2"></a>Table 2: UI_execute_usecode_array OpCodes

| **COMMAND** | **OPCODE** | **DESCRIPTION** |
| --- | --- | --- |
| `cont` | `0x01` | Continues script without painting |
| `reset` | `0x0a` | Resets the script back to the start. Be careful of using this with the nohalt opcode. Also, repeat will only work the first time around. |
| `repeat(offset, cnt)` | `0x0b` | Repeats all commands since offset opcodes/params ago cnt times* |
| `repeat2(offset, cnt1, cnt2)` | `0x0c` | Loops cnt1 times, each time repeating commands since offset opcodes/params ago cnt2 times* |
| `nop` | `0x21` | Does nothing. |
| `dont_halt` | `0x23` | Script cannot be halted by UI_halt_scheduled? |
| `wait_while_near(dist)` | `0x24` | Waits until avatar gets more than dist tiles away from script object |
| `delay_ticks(cnt)` | `0x27` | Waits cnt ticks |
| `delay_minutes(cnt)` | `0x28` | Waits cnt minutes |
| `delay_hours(cnt)` | `0x29` | Waits cnt hours |
| `wait_while_far(dist)` | `0x2b` | Waits until avatar gets closer than dist tiles away from script object |
| `finish` | `0x2c` | Finishes script if item is killed? |
| `remove` | `0x2d` | Deletes item and halts the script |
| `step_n` | `0x30` | Steps towards north |
| `step_ne` | `0x31` | Steps towards northeast |
| `step_e` | `0x32` | Steps towards east |
| `step_se` | `0x33` | Steps towards southeast |
| `step_s` | `0x34` | Steps towards south |
| `step_sw` | `0x35` | Steps towards southwest |
| `step_w` | `0x36` | Steps towards west |
| `step_nw` | `0x37` | Steps towards northwest |
| `descent` | `0x38` | Decreases lift (z coordinate) by 1 |
| `rise` | `0x39` | Increases lift (z coordinate) by 1 |
| `frame(frnum)` | `0x46` | Sets the frame for item to frnum |
| `egg` | `0x48` | If item is an egg, activates it |
| `set_egg(crit, dist);` | `0x49` | Changes an egg's activation conditions: 'crit' is the criteria, 'dist' the distance |
| `next_frame_max` | `0x4d` | Increases current frame by 1, stops at maximum |
| `next_frame` | `0x4e` | Increases current frame by 1, wrap to 0 at max |
| `prev_frame_min` | `0x4f` | Decreases current frame by 1, stops at 0 |
| `prev_frame` | `0x50` | Decreases current frame by 1, wrap to max at 0 |
| `say(text)` | `0x52` | Actor says text |
| `step(dir, dz)` | `0x53` | Steps in direction specified by dir (0-7), changing z coordinate by dz |
| `music(tracknum)` | `0x54` | Plays music number tracknum |
| `usecode(fun)` | `0x55` | Calls function fun with event = 2 |
| `speech(tracknum)` | `0x56` | Plays speech number tracknum |
| `sfx(sfxnum)` | `0x58` | Plays sound effect number sfxnum |
| `face_dir(dir)` | `0x59` | Turns to face direction dir (0-7) |
| `weather(type)` | `0x5a` | Sets weather type to type |
| `npc_frame` | `0x61-0x70` | Sets the frame for an NPC and keeps facing the same direction (new frame = opcode - `0x61`) |
| `hit(dam)` | `0x78` | Item attacked, loses dam hits |
| `attack` | `0x7a` | Attacks using information from previous '`set_to_attack`' intrinsic call |
| `usecode2(fun, eventid)` | `0x80` | Calls function fun with event = eventid |
| `resurrect` | `0x81` | Brings the actor back to life |

* For a better explanation of these opcodes, see the examples below.

By looking at the tables, one sees that repeat2 is the only one without a Usecode C script equivalent. The last two opcodes (usecode2 and resurrect) are Exult only - they do not exist in the original games.

In all cases, the parameters are 2-byte hex numbers while the opcodes are single-byte hex numbers. This means that parameters should be written with four digits after the '`0x`'.

I will now give an example of how to translate between '`execute_usecode_array`' and Usecode C scripts. I will begin with the example I picked from Erethian above; namely:

Erethian animation #1:


```usecode
UI_execute_usecode_array
    (
    item,
    [0x6F, 0x27, 0x0001, 0x01, 0x52, "@An Ailem!", 0x27, 0x0003, 0x70, 0x27, 0x0006]
    );
```

The first thing I will do is identify parameters and opcodes. As I said, parameters are 2-byte hex numbers; so the opcodes above are `0x6F`, `0x01`, `0x52`, `0x27`, `0x70` and `0x27` (again). This means that the above block is executed along the lines of:


```usecode
UI_execute_usecode_array
    (
    item,
    [0x6F,
     0x27(0x0001),
     0x01,
     0x52("@An Ailem!"),
     0x27(0x0003),
     0x70,
     0x27(0x0006)]
    );
```

Were (say) `0x27(0x0001)` means 'do `0x27` with `0x0001` as parameter'. Now we begin the conversion process: since we are dealing with '`execute_usecode_array`', we don't have a delay to worry about. So our script block begins with '`script item`'. Looking at [Table 1](#table1), above, we see that `0x6F (= 0x61 + 0x0E)` converts to '`actor frame 0x0E;`', `0x27(num)` converts to '`wait num;`', `0x01` converts to '`continue;`', `0x52("@An Ailem!")` converts to '`say "@An Ailem!";`' and `0x70` becomes '`actor frame 0x0F;`'. Thus:


```usecode
script item
{
    actor frame 14;        //14 = 0x0E
    wait 1;
    continue;
    say "@An Ailem!";
    wait 3;
    actor frame 15;        //15 = 0x0F
    wait 6;
}
```

That is, Erethian will raise his arms (frame `14 = 0x0E`) and keep looking in the same direction, then he waits 1 tick, says `"@An Ailem!"`, waits 3 more ticks, spreads his arms (frame `15 = 0x0F`) without changing facing and wait 6 more ticks. The '`@`', by the way, is an escape character for double quotes (i.e., it will be replaced by a double-quote when it is about to be displayed).

An example of a script with a delay is also found in Erethian's usecode:

Erethian animation #2, delayed usecode:


```usecode
UI_delayed_execute_usecode_array
    (
    item,
    [0x23, 0x52, "@I'll follow it.@"],
    0x0012
    );
```

'`delayed_execute_usecode_array`' calls will always convert to scripts with a delay; the delay is equal to the third parameter in the call. Proceeding as above, we have


```usecode
script item after 18 ticks        //18 = 0x0012
{
    nohalt;
    say "@I'll follow it.@";
}
```

Simple enough, right? Lets now work with an example involving a loop. For this example, I will take the usecode for a loom (shape 261); in it, we have following usecode:

Loom animation (shape 261):


```usecode
UI_execute_usecode_array
    (
    item,
    [0x46, 0x0000, 0x4E, 0x01, 0x58, 0x0006, 0x0B, 0xFFFC, 0x0020, 0x55, 0x0105]
    );
direction = getDirectionDirectionToObject(AVATAR, item);
UI_execute_usecode_array
    (
    AVATAR,
    [0x59, direction, 0x01, 0x67, 0x61, 0x27, 0x0001, 0x0B, 0xFFFB, 0x0009]
    );
```

(getDirectionDirectionToObject is function `0x827`) Separating the opcodes, we get


```usecode
UI_execute_usecode_array
    (
    item,
    [0x46(0x0000),
     0x4E,
     0x01,
     0x58(0x0006),
     0x0B(0xFFFC, 0x0020),
     0x55(0x0105)]
    );
direction = getDirectionDirectionToObject(AVATAR, item);
UI_execute_usecode_array
    (
    AVATAR,
    [0x59(direction),
     0x01,
     0x67,
     0x61,
     0x27(0x0001),
     0x0B(0xFFFB, 0x0009)]
    );
```

Now, in hex, `0xFFFC = -4` (since `0x10000 - 4 = 0xFFFC`), and `0xFFFB = -5`, so we have (using the friendly names defined above) that


```usecode
UI_execute_usecode_array
    (
    item,
    [frame(0x0000),
     next_frame,
     cont,
     sfx(0x0006),
     repeat(-4, 0x0020),
     usecode(0x0105)]
    );
direction = getDirectionDirectionToObject(AVATAR, item);
UI_execute_usecode_array
    (
    AVATAR,
    [face_dir(direction),
     cont,
     npcframe_6,
     npcframe_0,
     delay_ticks(0x0001),
     repeat(-5, 0x0009)]
    );
```

Since `0x0105 = 261`, `usecode(0x0105)` is calling the loom function again. Time now to work out what the repeat means before proceeding any further. I know that the explanation from the table isn't very enlightening on what the offset means, which is why I chose this example.

The 'prototype' of repeat is `repeat(offset, cnt)`. The offset determines how many opcodes and parameters before the repeat instruction will be repeated, while the cnt indicates how many times they will be repeated. For example, `sfx(0x0006)` is 1 opcode and 1 parameter, while cont and next_frame are 1 opcode each. Thus, `repeat(-4, 0x0020)` will repeat the commands `next_frame`, `cont` and `sfx(0x0006)` 32 (`=0x0020`) times in that order. The `repeat(-5, 0x0009)` will likewise repeat the commands from `cont` to `delay_ticks(0x0001)` (remember that `npcframe_0` and `npcframe_6` are 1 opcode and no parameters each) 9 (`=0x0009`) times each. Putting it all together, we end up with:


```usecode
script item            //item is the loom
{
    //Set the initial frame:
    frame 0;

    //Repeat the following commands 32 times each in sequence.
    //The loom has 16 frames; starting from frame zero, every
    //16 repeats returns the loom to frame zero; so the cycle
    //ends in frame zero.
    repeat 32
    {
        next frame cycle;
        continue;
        sfx 6;
    };

    //After all the above is done, call again the Loom function
    //to create the cloth:
    call Loom;        //Loom function # is 261 = 0x0105
}

//Determine which way the avatar must face:
direction = getDirectionDirectionToObject(AVATAR, item);

script AVATAR
{
    //Turn the avatar to the appropriate direction:
    face direction;

    //The "looming" animation of the avatar, repeated
    //nine times.
    repeat 9
    {
        continue;
        actor frame 6;
        actor frame 0;
        wait 1;
    };
}
```

The above code is equivalent to the original loom code with '`execute_usecode_array`', and is the same as the one I presented above as an example. All that remains now is to implement the rest of the Loom function and we could even compile it.
