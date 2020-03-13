const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up as Bobby Hill from king of the hill. There is a dog leash next to you.',
    options: [
      {
        text: 'Take the dog leash',
        setState: { dogLeash: true },
        nextText: 2
      },
      {
        text: 'Leave the dog leash',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across the merchant John Redcorn.',
    options: [
      {
        text: 'Trade the dog leash whip for a sword',
        requiredState: (currentState) => currentState.dogLeash,
        setState: { dogLeash: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the dog leash for a shield',
        requiredState: (currentState) => currentState.dogLeash,
        setState: { dogLeash: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking alleyway.',
    options: [
      {
        text: 'Explore the alleyway',
        nextText: 4
      },
      {
        text: 'Find a dumpster to sleep in',
        nextText: 5
      },
      {
        text: 'Find an abandoned house to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the alleyway and are devoured by a pack of kitty cats in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room, you break into the nearest bar and fall asleep. After a few hours of sleep the owner of the bar finds you and calls a police officer, who arrests you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby alleyway. Hot diggity-dog!',
    options: [
      {
        text: 'Explore the alleyway',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the alleyway you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Use dog leash whip',
        requiredState: (currentState) => currentState.dogLeash,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your feeble feet fail you and the monster makes you its meal.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Your slaying sword snaps and you perish.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You used your dog leash whip on the monster and it exploded. After the dust settled you saw the monster was destroyed. Basking in your own victorious glow, you decide to claim this alleyway as your own and live a long and happy life. You die at a ripe old age; drunk on alamo beer, full of the finest grilled foods, and surrounded by propain excessories.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()