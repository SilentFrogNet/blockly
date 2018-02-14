/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Dorker for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Dorker.logic');

goog.require('Blockly.Dorker');


Blockly.Dorker['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&' : '|';
  var order = (operator == '&') ? Blockly.Dorker.ORDER_LOGICAL_AND :
      Blockly.Dorker.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Dorker.valueToCode(block, 'A', order);
  var argument1 = Blockly.Dorker.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Dorker['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Dorker.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.Dorker.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '-' + argument0;
  return [code, order];
};

Blockly.Dorker['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.Dorker.ORDER_ATOMIC];
};
