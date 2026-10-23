```usecode
#include file
```

'file' is a filename surrounded by double-quotes. Usecode C will open that file and parse it just as if you had pasted the entire contents of the file at the location you placed this directive in. Each file can have as many includes as you need, but you can *nest* no more than 20 includes at present. It is good practice to use relative paths and slashes instead of backslashes (i.e., use '/' instead of '\') in the file names to keep your usecode portable.
