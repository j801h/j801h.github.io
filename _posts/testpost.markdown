---
layout: post
title:  Colombia 20213
date:   2017-05-26 13:05:55 +0300
image:  /assets/images/blog/post-3.jpg
author: uixgeek
tags:   UX design
---

**

<br>


| Region | Field   | Boundary       | Type                                                | Description                                      |
|--------|---------|----------------|-----------------------------------------------------|--------------------------------------------------|
| Shell  | alphat  | .*             | calculated                                          | Values calculated by the solver                  |
|        | epsilon | lower          | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | upper          | turbulentMixingLengthDissipationRateInlet          | Dissipation rate at the inlet with specified mixing length |
|        |         | wall           | epsilonWallFunction                                 | Wall function for turbulent dissipation rate     |
|        | k       | lower          | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | upper          | turbulentIntensityKineticEnergyInlet                | Kinetic energy at the inlet with specified turbulence intensity |
|        |         | wall           | kqRWallFunction                                     | Wall function for turbulent kinetic energy       |
|        | nut     | lower          | calculated                                          | Values calculated by the solver                  |
|        |         | upper          | calculated                                          | Values calculated by the solver                  |
|        |         | wall           | nutkWallFunction                                    | Wall function for turbulent kinematic viscosity  |
|        | p       | .*             | calculated                                          | Values calculated by the solver                  |
|        | p_rgh   | lower          | fixedValue                                          | Fixed value boundary condition                   |
|        |         | upper          | fixedFluxPressure                                   | Zero normal gradient for pressure minus hydrostatic pressure |
|        |         | wall           | fixedFluxPressure                                   | Zero normal gradient for pressure minus hydrostatic pressure |
|        | T       | lower          | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | upper          | fixedValue                                          | Fixed value boundary condition                   |
|        |         | walls          | zeroGradient                                        | No gradient normal to the boundary face         |
|        |         | shell_to_solid | compressible::turbulentTemperatureCoupledBaffleMixed  | Thermally coupled baffle faces between shell and solid  |
|        | U       | lower          | pressureInletOutletVelocity                         | Inlet or outlet depending on flow direction      |
|        |         | upper          | flowRateInletVelocity                               | Mass flow rate for the inlet                     |
|        |         | wall           | noSlip                                              | Zero velocity at the boundary (no-slip)          |



<br>



| Region | Field   | Boundary         | Type                                                | Description                                      |
|--------|---------|------------------|-----------------------------------------------------|--------------------------------------------------|
| Solid  | T       | external         | zeroGradient                                        | No gradient normal to the boundary face         |
|        |         | solid_to_shell   | compressible::turbulentTemperatureCoupledBaffleMixed  | Thermally coupled baffle faces between solid and shell |
|        |         | solid_to_tube    | compressible::turbulentTemperatureCoupledBaffleMixed  | Thermally coupled baffle faces between solid and tube  |
|--------|---------|------------------|-----------------------------------------------------|--------------------------------------------------|
| Tube   | alphat  | .*               | calculated                                          | Values calculated by the solver                  |
|        | epsilon | lower            | turbulentMixingLengthDissipationRateInlet          | Dissipation rate at the inlet with specified mixing length |
|        |         | upper            | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | wall             | epsilonWallFunction                                 | Wall function for turbulent dissipation rate     |
|        | k       | lower            | turbulentIntensityKineticEnergyInlet                | Kinetic energy at the inlet with specified turbulence intensity |
|        |         | upper            | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | wall             | kqRWallFunction                                     | Wall function for turbulent kinetic energy       |
|        | nut     | lower            | calculated                                          | Values calculated by the solver                  |
|        |         | upper            | calculated                                          | Values calculated by the solver                  |
|        |         | wall             | nutkWallFunction                                    | Wall function for turbulent kinematic viscosity  |
|        | p       | .*               | calculated                                          | Values calculated by the solver                  |
|        | p_rgh   | lower            | fixedFluxPressure                                   | Zero normal gradient for pressure minus hydrostatic pressure |
|        |         | upper            | fixedValue                                          | Fixed value boundary condition                   |
|        |         | wall             | fixedFluxPressure                                   | Zero normal gradient for pressure minus hydrostatic pressure |
|        | T       | lower            | fixedValue                                          | Fixed value boundary condition                   |
|        |         | upper            | inletOutlet                                         | Inlet or outlet depending on flow direction      |
|        |         | walls            | zeroGradient                                        | No gradient normal to the boundary face         |
|        |         | tube_to_solid    | compressible::turbulentTemperatureCoupledBaffleMixed  | Thermally coupled baffle faces between tube and solid  |
|        | U       | lower            | flowRateInletVelocity                               | Mass flow rate for the inlet                     |
|        |         | upper            | pressureInletOutletVelocity                         | Inlet or outlet depending on flow direction      |
|        |         | wall             | noSlip                                              | Zero velocity at the boundary (no-slip)          |

<center><span style="font-size: 16px;">**Please refer to the openFOAM documentation or source code for more details on boundary condition functions**</span></center>