The intrinsic prototypes below are in Usecode C-esque form. It is actually more like C than Usecode C. Specifically, all parameters have a type instead of the Usecode C-'`var`'. The parameter type indicates what Exult will be expecting; the Usecode C compiler won't care in the slightest what you pass as a parameter. The parameter types I use are as follows:

| Parameter / value | Description |
| --- | --- |
| Keyword | Description |
| `int` | This means any integer, positive or negative. |
| `object` | Any object or NPC. It can be an object reference, '`item`' or a number (that **must** be negative, which Exult will convert to an NPC if it is in the correct range). |
| `actor` | Any NPC. It is evaluated the same way as '`object`' is, but Exult will reject anything that can't be converted to an NPC. Monsters are also accepted. |
| `bool` | A '`true`'/'`false`' parameter. Can be a number (nonzero/zero), an array (non-empty/empty) or a comparison expression (e.g., '`a == b`'. |
| `string` | A string (text). Strings in usecode are any set of characters surrounded by double-quotes; for example, `"This is a string."`. If you need a double-quote inside a string you can 'escape' it by prefixing them with a backslash: `"\""`; alternatively, Exult converts '`@`' into a double-quote. |
| `function` | A usecode function, which **must** be declared with either, the `shape#` *or* the `object#` specifiers. In Usecode C, this can be the function name or its usecode number. For example: '`extern Bolt shape#(0x2D3) ();`' can be passed as '`Bolt`' (the function name), '`0x2D3`' (its function number since '`shape#(shnum) == shnum`' if `shnum < 0x400`) or as '`&Bolt`' (using the 'address of' operator '`&`' to get the function number). |

If the parameter name is followed by a '`[]`', it indicates an array with elements of the specified type. Example: '`actor npc[]`' means an array of NPCs. If there is a number between the brackets, it means an array of that length; for example, '`int num[3]`' means an array with 3 '`int`' elements. In some cases, an array can be of type '`mixed`' to indicate that not all of the array's elements are of the same type.

Some intrinsics are 'overloaded'; i.e., they accept more than one parameter type. In those cases, all of the possibilities are listed as prototypes.

If the parameter list is simply '`[special]`', see the description for details.

If the intrinsic is preceded by a parameter type, it means that the intrinsic returns something of that type; the description explains the return value. In some cases, the return value can be '`mixed[]`' to indicate that the intrinsic returns an array, not all of which are of the same type.

All intrinsics can be called as presented in the list. If an intrinsic has at least one parameter, it can be called in 'calle' form, with the first parameter as its '`object`'. Example:


```usecode
int UI_execute_usecode_array(object obj, int script[]);
int obj->execute_usecode_array(int script[]);
```

The first parameter and the '`->`' can both be omitted if '`obj`' is '`item`', and if you omit either of them you **must** omit both or the Usecode will fail to compile. For stylistic purposes, the 'calle' form should be used only when the first parameter is an object or NPC (or '`item`'). For all intrinsics with 'appropriate' parameter types, I have listed both forms in the list below.

Also, you may have noticed that I did not include the parameter type of '`obj`' when I gave the 'calle' form of execute_usecode_array; since I will only give the 'calle' form when the parameter type is '`object`' or '`actor`', I feel that it is unneeded.
