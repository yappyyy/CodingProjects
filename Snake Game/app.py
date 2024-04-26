from turtle import *
import turtle as t  # Alias the turtle module for clarity #A Python library used for creating graphics and simple animations.
from random import randrange
from freegames import square, vector #handle 2D coordinates and movement, and square is used to draw squares on the screen.
import pygame
pygame.init()

t.title("My Snake Game") 
food = vector(0, 0)
snake = [vector(10, 0), vector(10,0)]
aim = vector(0, -10)
score = 0  # Initialize score

# Function to update and display the score
def display_score():
    t.penup()
    t.goto(0, 190)
    t.pendown()
    t.write(f"Score: {score}", align="center", font=("Arial", 12, "normal"))

eat_sound = pygame.mixer.Sound("eating_sound.mp3")
gameover_sound = pygame.mixer.Sound("gameover.mp3")

def change(x, y):
    "Change snake direction."
    aim.x = x
    aim.y = y

def inside(head):
    "Return True if head inside boundaries."
    return -190 < head.x < 180 and -190 < head.y < 180

# Function to restart the game
def restart_game():
    global snake, food, aim, score
    snake = [vector(10, 0), vector(10, 0)]
    food = vector(0, 0)
    aim = vector(0, -10)
    score = 0
    clear()
    move()

# Bind the 'r' key to restart the game
onkey(restart_game, 'r')

def move():
    global score  # Use global variable for score
    "Move snake forward one segment."
    head = snake[-1].copy()
    head.move(aim)

    # Wrap around the edges if the snake goes out of bounds 
    if head.x > 180:
        head.x = -190
    elif head.x < -190:
        head.x = 180
    elif head.y > 180:
        head.y = -190
    elif head.y < -180:
        head.y = 180

    if head in snake:
        square(head.x, head.y, 9, 'red')
        update()
        gameover_sound.play()  # Play the sound effect for game over
        t.write("Game Over. Press 'r' to restart.", align="center", font=("Arial", 16, "bold"))
        return

    snake.append(head)

    if head == food:
        food.x = randrange(-15, 15) * 10
        food.y = randrange(-15, 15) * 10
        score += 1
        eat_sound.play()  # Play the sound effect for eating food
        print('Snake:', len(snake), 'Score:',score)
    else:
        snake.pop(0)

    clear()

    for body in snake:
        square(body.x, body.y, 9, 'black')
        square(body.x + 5, body.y, 9, 'black')

    square(food.x, food.y, 9, 'red')
    display_score()  # Update and display score
    update()
    ontimer(move, 75) #controls the game's update rate and thus the speed of the snake  The number 100 here represents the delay in milliseconds between each call to the move() function

setup(440, 440, 370, 0)  # Set window size and position
bgcolor('darkgreen')  # Set the background color to dark green outside the border
tracer(False)
hideturtle()

# Draw the border
border_pen = t.Turtle()
border_pen.speed(0)
border_pen.color('black')
border_pen.penup()
border_pen.goto(-200, -200)
border_pen.pendown()
border_pen.pensize(4)
for _ in range(4):
    border_pen.forward(380)
    border_pen.left(90)
border_pen.hideturtle()

# Draw light green inside the border
border_fill = t.Turtle()
border_fill.speed(0)
border_fill.color('lightgreen')
border_fill.penup()
border_fill.goto(-196, -196)
border_fill.pendown()
border_fill.begin_fill()
for _ in range(4):
    border_fill.forward(372)
    border_fill.left(90)
border_fill.end_fill()
# Instructions popup
instructions = t.textinput("Instructions", "Use WASD or arrow keys to move the snake. Press Enter to start.")

listen()
onkey(lambda: change(10, 0), 'Right')
onkey(lambda: change(-10, 0), 'Left')
onkey(lambda: change(0, 10), 'Up')
onkey(lambda: change(0, -10), 'Down')
# Additional keyboard controls for WASD
onkey(lambda: change(10, 0), 'd')
onkey(lambda: change(-10, 0), 'a')
onkey(lambda: change(0, 10), 'w')
onkey(lambda: change(0, -10), 's')
move()
done()