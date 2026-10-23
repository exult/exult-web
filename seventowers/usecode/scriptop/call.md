```usecode
call fun
call fun, eventid
```

Calls the function 'fun'. If 'eventid' is specified, then the function will be called with '`event == eventid`'; otherwise, '`event`' will be determined as follows:

- If the object is an egg, `event` is 'EGG'
- If the function 'fun' has been specified in a previous call of '`UI_telekenesis`' intrinsic, then `event` is 'DOUBLECLICK'
- In all other cases, `event` is 'SCRIPTED'

As a rule of thumb, it would be much better to avoid the '`UI_telekenesis`' intrinsic altogether and specify the desired 'eventid'.

The second form (specifying 'eventid') is Exult-only.
