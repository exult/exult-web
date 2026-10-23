```usecode
setegg crit, dist
```

If the actor is an egg, changes the egg's activation criteria. Both parameters are integers; 'dist' indicates the distance at which the egg will fire, if applicable. 'crit' can take one of the following values:

| **Value** | **Meaning** |
| --- | --- |
| 0 | Egg is activated when the chunk is cached-in; 'dist' is ignored; |
| 1 | When any party member comes within 'dist' tiles of the egg; |
| 2 | When the avatar comes within 'dist' tiles of the egg; |
| 3 | When the avatar comes within 'dist' tiles of the egg and then **leaves** the area; |
| 4 | When the avatar steps on the egg; 'dist' is ignored; |
| 5 | When any party member steps on the egg; 'dist' is ignored; |
| 6 | When anything is placed on/near the egg or when something already on/near the egg is removed; |
| 7 | The egg can be activated only through usecode or through 'button' eggs; 'dist' is ignored. |
