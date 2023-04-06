---
layout: page
title: Finite Element Analysis S&T Heat Exchanger (ongoing)
image: /assets/images/portfolio/item-5.png
description: A brief description of your project.
tags: ["Process Simulation", "Extra-Curricular", "Team Efforts"]
---

### Summary

Finite Element Analysis (FEA) is a powerful computational method for simulating complex physical systems, such as shell and tube heat exchangers, by dividing them into smaller elements. By solving time-dependent governing equations and applying boundary conditions, FEA can model transient conditions and provide insights into temperature profiles, pressure drop, heat transfer rates, and potential hotspots or areas of high stress. 

To that end, I have sourced a CAD file for a shell-and-tube heat exchanger, developed mesh representations for the exchanger's flow regions, and have simulated and visualized a steady-state flow condition for the exchanger. My ultimate goal here is to develop a generalized workflow for converting CAD files and process constraints into high-fidelity models of transient process behaviors. 

As I make more progress, I will provide detailed updates and welcome any ideas for improving this strategy or generalizing it for wider applications in digital twin simulation technology.

### The Speed-Reader's 'So-What'
This project demonstrates my ability to tackle complex engineering challenges and optimize performance in critical systems. By modeling transient conditions and extracting valuable insights from complex simulation behaviors, this project highlights my proficiency in leveraging computational techniques to enhance the efficiency and reliability of process designs.

Optimizing heat exchangers and other thermal systems plays a crucial role in reducing energy consumption, minimizing waste, and maximizing resource utilization. My experience with FEA allows me to contribute directly to these objectives by applying my skills to design, analyze, and optimize energy-efficient and sustainable solutions. Furthermore, my knowledge of digital twin simulation technology opens up opportunities for simulating and predicting the performance of systems in real-time, ensuring high-quality operational strategies.

### Objective

To accurately model transient process conditions within a shell-and-tube heat exchanger using FEA and only Free-and-Open-Source-Software (FOSS) tools. 

### Progress-to-date
So far, I have sourced an appropriate STL file for a shell-and-tube heat exchanger and performed necessary pre-processing steps to ensure accurate mesh dimensions:
<br> 

![HX Body](\assets\images\portfolio\HX\3d_exchanger_body.png){: .responsive-image}

<br>

 Further, I have developed the mesh representations for the exchanger, shown here:

<br>

![Hot Region](\assets\images\portfolio\HX\hot_region_mesh.png){: .responsive-image}

<br>

![Cold Region](\assets\images\portfolio\HX\full_mesh.png){: .responsive-image}
<br>
Before diving into transient flow modeling, I decided to check the viability of the meshes using a steady-state approach, with hot and cold water on the tube and shell-sides, respectively. Initial process parameters were as follows:

<br>

|                     | Hot Side       | Cold Side    |
| :----------:        | :-----------:  | :----------: |
| Inlet Temperature   | 383 K          | 283 K        |
| Fluid Velocity      | 0.02 m/s       | 0.01 m/s     |

<br>

Using SimFlow to experiment with steady-state conditions, and ParaView for data visualization, I got the following results:

<br>

![Residuals](\assets\images\portfolio\HX\residuals.png){: .responsive-image}

<br>

Where residuals refer to the difference between the calculated value of a variable and its expected value based on its governing equations. Commonly used threshold values are in the range of 1e-4 to 1e-6. These values can be adjusted depending on the desired level of accuracy and the computational resources available, but for this idealized experimental application, these values are acceptable.

<br>

![Velocity](\assets\images\portfolio\HX\velocity.png){: .responsive-image}

<br>

Where 'U' represents fluid velocity, and points are colored based on fluid velocity profile. Looks good!

Unfortunately, the SimFlow output files seem to have a compilation error that makes the temperature data unreadable, so I will be troubleshooting that next.


### Transient Flow Case

TBA!

<br>

I will provide detailed updates as I make more progress. If you have any ideas for improving this strategy, please reach out! I would love to collaborate on this and ideas for generalizing this procedure as digital twin simulation tech becomes more accessible.

If any of these projects sound pertinent to a role you are trying to fill, please consider [reaching out](/contact), or feel free to browse my [other recent projects](/portfolio).
