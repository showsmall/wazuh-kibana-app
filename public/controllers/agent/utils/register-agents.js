/*
 * Wazuh app - agents-preview:register-agents
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import React, { Component, Fragment } from 'react';

import {
  EuiCodeBlock,
  EuiButton,
  EuiText,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer,
  EuiFieldText,
  EuiSteps,
  EuiI18n,
  EuiCopy,
  EuiButtonEmpty,
  EuiCode,
  EuiButtonToggle
} from '@elastic/eui';

export default class RegisterAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      selectedOS: '',
      rpmtoggle: false,
      debtoggle: false,
      wintoggle: false,
      macostoggle: false
    };

    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(i, selectedOS = '') {
    this.setState({
      selectedOS,
      rpmtoggle: i === 0,
      debtoggle: i === 1,
      wintoggle: i === 2,
      macostoggle: i === 3
    });
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  getCommands() {
    return `// ${this.state.selectedOS} steps\n$ export address=${
      this.state.value
    }\n$ bin/wazuh restart`;
  }

  render() {
    const firstStep = (
      <Fragment>
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiButtonToggle
              label="Red Hat / CentOS"
              fill={this.state.rpmtoggle}
              onChange={() => this.handleComplete(0, 'Red Hat / CentOS')}
              isSelected={this.state.rpmtoggle}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonToggle
              label="Debian / Ubuntu"
              fill={this.state.debtoggle}
              onChange={() => this.handleComplete(1, 'Debian / Ubuntu')}
              isSelected={this.state.debtoggle}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonToggle
              label="Windows"
              fill={this.state.wintoggle}
              onChange={() => this.handleComplete(2, 'Windows')}
              isSelected={this.state.wintoggle}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonToggle
              label="MacOS"
              fill={this.state.macostoggle}
              onChange={() => this.handleComplete(3, 'MacOS')}
              isSelected={this.state.macostoggle}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <EuiText color="secondary">
          <p>
            Wazuh agent can also be installed from our package repositories. See{' '}
            <a
              target="_blank"
              href="https://documentation.wazuh.com/current/installation-guide/installing-wazuh-agent/index.html"
            >
              Repositories in the Guide
            </a>
            .
          </p>
        </EuiText>
      </Fragment>
    );

    const secondStep = (
      <Fragment>
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiFieldText
              placeholder="Server address..."
              value={this.state.value}
              onChange={e => this.onChange(e)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );

    const thirdStep = (
      <EuiText>
        <EuiCodeBlock language="sh" fontSize="m" color="dark">
          {this.getCommands()}
        </EuiCodeBlock>
      </EuiText>
    );

    const firstSetOfSteps = [
      {
        title: 'Choose OS',
        children: firstStep,
        status: this.state.statusOne
      },
      {
        title: 'What the Wazuh server address is?',
        children: secondStep,
        status: this.state.statusTwo
      },
      {
        title: 'Copy and paste the next commands in the agent instance',
        children: thirdStep,
        status: this.state.statusThree
      }
    ];

    return (
      <div>
        <EuiSteps steps={firstSetOfSteps} />
      </div>
    );
  }
}
