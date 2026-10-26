For Usecode C purposes, the avatar is an NPC just like any other. Constants referred to below (usually in ALL CAPS) are defined in 'src/headers/constants.uc' unless otherwise stated.

Unlike Usecode C-defined functions, intrinsics do not have compiler-enforced prototypes. The signatures below describe the values expected by the engine, rather than declarations to copy into your source. Supply the documented parameters and use the named intrinsic so UCC selects the correct game-specific ID.

There is no fixed 12-argument buffer limit in the current engine. This does not make arbitrary argument lists meaningful: the implementation determines which values it reads, how it interprets them, and whether omitted arguments have defaults. Omit an argument only when the intrinsic description explicitly makes it optional. The runtime checks each intrinsic's declared minimum argument count before calling its implementation; calls with too few arguments print a diagnostic and are skipped. Optional-argument defaults are handled by the implementation, which receives exactly the arguments supplied by the caller.

The descriptions and ID table have been checked against `usecode/intrinsics.cc`, `usecode/bgintrinsics.h`, `usecode/siintrinsics.h`, and `usecode/sibetaintrinsics.h`. UCC portrait statements are also checked against `tools/compiler/ucparse.yy`.

{{include:reference/intrinsic_legend}}

{{include:reference/intrinsic_params}}

{{include:reference/intrinsic_ids}}
