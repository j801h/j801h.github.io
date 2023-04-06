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
In my role as a Process Design Engineer, a colleague and I collaborated on enhancing a distillery's production scheduling process, concentrating on process refinement. We pinpointed opportunities for automation, system integration, advanced optimization, and better stakeholder communication. By developing a tailor-made process simulation using reinforcement learning, we maximized equipment usage while adhering to scheduling constraints. Our solution considerably reduced the scheduling team's workload and elevated equipment utilization rates by roughly 20%.

### The Quick Takeaway
This distillery process improvement project demonstrates my analytical skills and innovative mindset--skills that I believe are essential for success in eco-friendly operations. The experience I gained in refining production scheduling and equipment utilization through automation and reinforcement learning can be directly applied to support sustainable practices.

My effective communication and collaboration with various stakeholders, along with my commitment to continuous learning, contribute to my ability to address diverse challenges.

### Background
I had the chance to work on a process improvement proposal project for a distillery in collaboration with a teammate. Our central goal was to examine the distillery's production scheduling process. Through our analysis, we identified numerous areas that could be bolstered for enhanced efficiency through automation. We proposed a more efficient and dynamic scheduling method to better accommodate the intricate needs of the distillery's operation.

### Suggested Enhancements
Initially assigned with improving the distillery's scheduling process, we started by familiarizing ourselves with the operation and comprehending the existing process. We engaged with the production team, warehouse personnel, and management to collect insights on their pain points and concerns regarding the scheduling process. It rapidly became evident that their manual Gantt-chart-like method was antiquated and inefficient for such a large-scale operation.

To gain insight into how other companies were tackling similar challenges, we investigated industry best practices and discovered that numerous successful distilleries had implemented automated scheduling tools and integrated them with other systems like inventory management and human resources.

Equipped with this knowledge, we aimed to identify specific areas for improvement. We concentrated on automation, system integration, advanced optimization techniques, and enhanced communication among stakeholders. My teammate and I realized the opportunity to develop a new product offering for our firm and opted to create a customized process simulation that could optimize equipment utilization based on given scheduling constraints. We developed a small proof-of-concept proposal and presented it to our firm's project management team for approval.

With management's approval, we commenced developing the program for the distillery. Our first step was to gain a robust understanding of their needs and challenges. We spoke with the production team, warehouse staff, and management to learn about their existing processes, equipment, and expectations. Ensuring the simulation would accurately represent their operation was crucial.

After we had a lucid understanding of their requirements, we gathered and scrutinized historical data on production schedules, raw material consumption, equipment availability, and other relevant details. This allowed us to identify patterns and constraints that needed to be considered in the simulation.

Next, we developed a process model that accurately depicted the distillery's operations. We mapped out the process flow, defined process parameters, and specified interdependencies and constraints. Armed with this model, we began constructing the simulation program.

Our first task was to preprocess the historical data, clean it, and extract pertinent features that would serve as inputs for the reinforcement learning model at the core of the simulation. This encompassed information on production schedules, equipment availability, resource allocation, and other relevant factors.

Next, we developed the learning environment, which represented the distillery's production process, including equipment, resources, and production steps. We also established the reward function that would guide the learning process. In this case, the reward function was designed to maximize equipment utilization rates while meeting scheduling constraints and quotas.

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

We also emphasized creating a user-friendly interface for the distillery's team. Our goal was to develop an intuitive UI that would enable them to interact with the program, input their scheduling preferences and constraints, and clearly visualize the results. Despite this being beyond our initial proposal, we dedicated time after work each day to learn front-end development using libraries like Django and Bootstrap4 (also used to create this site!) and progressively enhance our vision for our firm's new product offering. Trust me, it was gorgeous.

### Outcomes
After fully developing and refining the proposals, we presented them to the distillery's management team. We highlighted the anticipated benefits, along with a concise action plan and recommendations for monitoring and evaluating the success of the improvements. The team expressed gratitude for our work, and the distillery scheduling team quickly adopted our program. According to their feedback, we saved the scheduling team dozens of hours each week and improved average equipment utilization rates by approximately 20%.

Although we successfully delivered a valuable tool to this client, we were unable to standardize this project as a product offering for our firm. Ultimately, the steep learning curve associated with the various elements involved, as well as our failure to clearly outline pricing and guarantee results across process types, contributed to this outcome. Moreover, our firm faced an unrelated "all-hands-on-deck" situation when its largest project risked entering a phase of liquidated damages during the peak of the pandemic (refer to 'Pet Food Process Expansion - QA / QC Lead' for that story!). Unfortunately, this diverted my partner and me from further developing our proposal.

Nevertheless, our client was satisfied with our tailor-made solution addressing their process needs, and my partner and I learned a substantial amount throughout the journey.

<br>

If any of these projects seem relevant to a role you are trying to fill, please consider [reaching out](/contact) or feel free to explore my [other recent work](/portfolio).

