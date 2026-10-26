For Usecode C purposes, the avatar is an NPC just like any other. Constants referred to below (usually in ALL CAPS) are defined in 'src/headers/constants.uc' unless otherwise stated.

Unlike Usecode C-defined functions, intrinsics do not have compiler-enforced prototypes. The signatures below describe the values expected by the engine, rather than declarations to copy into your source. Supply the documented parameters and use the named intrinsic so UCC selects the correct game-specific ID.

In the current engine, `Usecode_internal::call_intrinsic` allocates at least 13 argument slots, fills them from the call, and leaves unused slots as zero-valued, undefined values. There is no longer a fixed 12-argument buffer limit. This padding means that implementation checks based on `parms.size()` cannot reliably detect omitted arguments: optional parameters may receive zero instead of the fallback written in the intrinsic. Where that changes a documented default, pass the value explicitly; the affected entries explain the current behavior.

The descriptions and ID table have been checked against `usecode/intrinsics.cc`, `usecode/bgintrinsics.h`, `usecode/siintrinsics.h`, and `usecode/sibetaintrinsics.h`. UCC portrait statements are also checked against `tools/compiler/ucparse.yy`.

{{include:reference/intrinsic_legend}}

{{include:reference/intrinsic_params}}

{{include:reference/intrinsic_ids}}
