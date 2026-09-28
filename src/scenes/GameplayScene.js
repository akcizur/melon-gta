/**
 * Gameplay Scene - Main playable world
 */

import * as me from 'melonjs'
import { PlayerEntity } from '../entities/PlayerEntity.js'

export class GameplayScene extends me.Stage {
  onResetEvent() {
    // Set background color
    me.game.world.backgroundColor = '#2a4a2a'

    // Create a simple debug grid/background
    this.drawBackground = true

    // Add player entity
    this.player = new PlayerEntity(
      me.game.world.width / 2,
      me.game.world.height / 2
    )
    this.addChild(this.player)

    // Set camera to follow player
    me.game.world.activeCamera.follow(this.player)
    me.game.world.activeCamera.setDeadzone(100, 100)

    // Add HUD text
    this.hud = new me.Text(
      10,
      10,
      { text: 'Welcome to Polda World!', font: '16px Arial' },
      {
        fillStyle: '#00ff00'
      }
    )
    this.hud.floating = true // HUD stays on screen
    this.addChild(this.hud)

    // Add debug info
    this.debugText = new me.Text(
      10,
      30,
      { text: 'Use ARROW KEYS or WASD to move', font: '12px Arial' },
      {
        fillStyle: '#00cc00'
      }
    )
    this.debugText.floating = true
    this.addChild(this.debugText)

    // ESC to return to menu
    me.input.bindKey(me.input.KEY.ESC, 'menu', true)

    console.log('✓ GameplayScene loaded')
  }

  update(dt) {
    // Check for menu key
    if (me.input.isKeyPressed('menu')) {
      me.game.world.switchActiveScene('menu')
    }

    return super.update(dt)
  }

  draw(renderer) {
    // Draw background grid (debug)
    if (this.drawBackground) {
      renderer.setColor('#444444')
      const gridSize = 32
      for (let x = 0; x < me.game.world.width; x += gridSize) {
        renderer.drawLine(x, 0, x, me.game.world.height)
      }
      for (let y = 0; y < me.game.world.height; y += gridSize) {
        renderer.drawLine(0, y, me.game.world.width, y)
      }
    }

    super.draw(renderer)
  }

  onDestroyEvent() {
    me.input.unbindKey(me.input.KEY.ESC, 'menu')
  }
}
