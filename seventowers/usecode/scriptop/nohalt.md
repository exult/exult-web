```usecode
nohalt
```

Immediatelly executes a second script command. This command has three main effects:

1. It allows the actor to move freely during the script's execution;
2. it prevents the script from being terminated by the '`halt_scheduled`' intrinsic;
3. it prevents the script from being terminated by scripts that do not have '`nohalt`' as their first command.

Additionaly, if the '`nohalt`' command is the first in a script, it prevents the termination of the actor's other scripts.
