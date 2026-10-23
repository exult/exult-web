```usecode
#autonumber hex_num
```

Starts smart auto-numbering for functions. 'hex_num' is a **hexadecimal** number which will be used for the next function you define without an explicit number assignment. It is **strongly** recommended that you use this directive; in fact, it should be placed as early as possible in your code. It is recommended that you set 'hex_num' to at least 0xA00 when making modifications for Black Gate or Serpent Isle (or at least 0x400 when creating your own game), as a lower value might conflict with the original game functions or shape functions. You only need to use this directive once, but you can use it multiple times if you need to.
