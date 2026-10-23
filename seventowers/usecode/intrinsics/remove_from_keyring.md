Removes a key from the keyring. Note that the keyring is a global object; multiple keyrings will share the same list of keys.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `qual` | The quality of the key to be removed. |

#### Return

If the key was on the keyring, returns `true`; otherwise, returns `false`.
