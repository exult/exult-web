```usecode
wait delay
wait delay minutes
wait delay hours
wait while near dist
wait while far dist
```

For the first 3 variants, delays the next command of the script by 'delay' ticks, minutes or hours.

The last two variants cause the script to wait until the avatar gets within the desired range -- farther than 'dist' tiles for `wait while near`, closer than 'dist' tiles for `wait while far`.
