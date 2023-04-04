---
layout: page
title: Distillery Process Simulation
image: /assets/images/portfolio/item-1.png
description: A brief description of your project.
tags: ["Process Design", "Process Simulation", "Team Efforts"]
---
### Role: Process Optimization Consultant
<br>

### Summary

At my previous firm, my teammate and I worked on a process-improvement project for a distillery, focusing on optimizing their production scheduling process. We identified opportunities for automation, system integration, advanced optimization, and improved communication. We developed a customized process simulation using reinforcement learning to optimize equipment utilization while meeting scheduling constraints. Our solution saved the scheduling team significant time and improved equipment utilization rates by about 20%.

### The Speed-Reader's 'So-What'
This process-improvement project for a distillery demonstrates my strong analytical skills, innovation, and adaptability, which are crucial for success in more sustainable and environmentally friendly fields. My experience in optimizing production scheduling and equipment utilization using automation and reinforcement learning can be directly applied to promoting sustainable practices and reducing environmental impact.

My effective communication and collaboration with diverse stakeholders, combined with my commitment to continuous learning, make me an ideal candidate for driving sustainability efforts. Overall, my process improvement and optimization skills enable me to contribute to innovative solutions in the sustainable industry for a greener future.

### Background

I had the opportunity to work on a process-improvement proposal project for a distillery alongside a teammate. Our main objective was to analyze the distillery's production scheduling process. Through our analysis, we identified several areas that could be enhanced for improved efficiency via automation. We suggested a more streamlined and dynamic scheduling method to better align with the complex needs of the distillery's operation.

### Proposed Improvements

When we were first tasked with improving the distillery's scheduling process, we began by getting a feel for the operation and understanding the existing process. We spoke with the production team, warehouse staff, and management to gather insights on their pain points and concerns regarding the scheduling process. It quickly became apparent that the manual Gantt-chart like method that they were using was outdated and inefficient for such a large operation.

To get a better idea of how other companies were handling similar challenges, we researched industry best practices and found that many successful distilleries had adopted automated scheduling tools and integrated them with other systems like inventory management and human resources.

Armed with this knowledge, we set out to identify specific areas for improvement. We focused on automation, system integration, advanced optimization techniques, and improved communication among stakeholders. My partner and I recognized the opportunity to develop a new product offering for our firm, and decided to build a customized process simulation that could optimize equipment utilization for given scheduling constraints. We developed a small proof-of-concept proposal and took it to our firm's project management team for approval.

With a green light from management, we started developing the program for the distillery. The first thing we did was get a deep understanding of their needs and challenges. We spoke with the production team, warehouse staff, and management to learn about their existing processes, equipment, and expectations. It was crucial for us to ensure that the simulation would accurately represent their operation.

Once we had a clear understanding of their requirements, we collected and analyzed historical data on production schedules, raw material consumption, equipment availability, and other relevant factors. This helped us identify patterns and constraints that needed to be considered in the simulation.

We then developed a process model that accurately represented the distillery's operations. We mapped out the process flow, defined process parameters, and specified interdependencies and constraints. With this model in hand, we started building the simulation program.

We started by preprocessing the historical data, cleaning it, and extracting relevant features that would serve as inputs for the reinforcement learning model at the heart of the simulation. This included information on production schedules, equipment availability, resource allocation, and other relevant factors.

Next, we defined the learning environment, which represented the distillery's production process, including equipment, resources, and production steps. We also set up the reward function that would guide the learning process. In this case, the reward function was designed to maximize equipment utilization rates while meeting scheduling constraints and quotas.

We then trained the reinforcement learning model using the learning environment. The model would learn to make decisions on resource allocation and production sequences by interacting with the environment and receiving feedback in the form of rewards. Over time, the model would become better at making decisions that led to higher equipment utilization rates and more efficient production schedules. This approach provided a dramatic performance boost over our initial Monte-Carlo-style simulation, which made random decisions and selected the best result of X simulations.

The following is a general outline of the underlying RL structure:

```python
import data_preprocessing
import learning_environment
import reinforcement_learning

# Preprocess historical data
raw_data = load_data('historical_data.csv')
cleaned_data, features = data_preprocessing.preprocess(raw_data)

# Split data into training and validation sets
train_data, validation_data = data_preprocessing.split_data(cleaned_data)

# Create the learning environment
env = learning_environment.create_environment(train_data, features)

# Initialize the reinforcement learning model
rl_model = reinforcement_learning.init_model(env)

# Train the model using the training data
for episode in range(num_episodes):
    state = env.reset()
    done = False

    while not done:
        # Choose an action based on the current state
        action = rl_model.choose_action(state)

        # Take the action and observe the new state and reward
        new_state, reward, done = env.step(action)

        # Update the model based on the observed reward and new state
        rl_model.update(state, action, reward, new_state)

        # Move to the new state
        state = new_state

    # Evaluate the model's performance using the validation data
    performance = reinforcement_learning.evaluate(rl_model, validation_data)

    # If performance is satisfactory, stop training
    if performance > target_performance:
        break

# Integrate the trained model into the simulation program
simulation_program.integrate_model(rl_model)
```

We also focused on designing a user-friendly interface for the distillery's team. We wanted to create an intuitive UI that would allow them to interact with the program, input their scheduling preferences and constraints, and clearly visualize the results. This being outside the bounds of our initial proposal, we met each day after work to teach ourselves front-end development using libraries like Django and Bootstrap4 (used to make this site as well!) and iteratively improve what we envisioned as our firm's newest product offering. Trust me, it was gorgeous.

### Outcomes

Once the proposals were fully developed and refined, we presented them to the distillery's management team. We emphasized the expected benefits, along with a clear action plan and recommendations for monitoring and evaluating the success of the improvements. The team was grateful for our work, and the distillery scheduling team took to our program immediately. Their feedback suggested that we saved the scheduling team 10s of hours each week, and improved average equipment utilization rates by ~20%.

While we were successful in delivering a useful tool to this client, we did not succeed in standardizing this project as a product offering for our firm. Ultimately, I think that was due to the steep learning curve associated with the various elements involved (this would be a difficult team to grow beyond my partner and myself), as well as our inability to clearly outline pricing and guarantee results across process types. Further, our firm had an unrelated 'all-hands-on-deck' moment when its largest project was at risk of entering a phase of liquidated damages during the height of the pandemic (see 'Pet Food Process Expansion - QA / QC Lead' for that story!). Unfortunately, this drew my partner and I away from further developing our proposal. 

Regardless, our client was pleased with our custom solution to address their process needs, and my partner and I learned *a lot* along the way. 

If any of these projects sound pertinent to a role you are trying to fill, please consider [reaching out](/contact), or feel free to browse my [other recent projects](/portfolio).

