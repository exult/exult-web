For Usecode C purposes, the avatar is an NPC just like any other. Constants referred to below (usually in ALL CAPS) are defined in 'src/headers/constants.uc' unless otherwise stated.

Unlike Usecode C-defined functions, intrinsics do not have a 'prototype'; you can pass as many (or as few) parameters to an intrinsic as you like. The only 'hard' limits are that Exult will not like if you (1) call an intrinsic with more than 12 parameters or (2) the intrinsic expects parameters which you haven't supplied. The parameter lists in the list below is the minimum safe number of parameters.

{{include:reference/intrinsic_legend}}

{{include:reference/intrinsic_params}}
