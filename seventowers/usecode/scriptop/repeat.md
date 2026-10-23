```usecode
repeat cnt script_command
repeat cnt {script_command_list}
repeat cnt, rst script_command
repeat cnt, rst {script_command_list}
```

Executes the 'script_command' or 'script_command_list' commands once and then **repeats** them 'cnt' times. For the variants with 'rst', 'cnt' is set to 'rst' once it reaches zero. If omitted, 'rst' is implicitly generated for nested repeats to be equal to 'cnt'.
