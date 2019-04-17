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
import React from 'react';

import {
  EuiCodeBlock,
  EuiButton,
  EuiText,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer
} from '@elastic/eui';

export const configurationSample = `<address>MANAGER_IP</address>`;

export const installationSteps = [
  {
    title: 'Download Wazuh agent installer',
    children: (
      <EuiText>
        <EuiFlexGroup gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton
              href="https://packages.wazuh.com/3.x/yum/wazuh-agent-3.8.2-1.x86_64.rpm"
              iconType="importAction"
            >
              RPM
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              href="https://packages.wazuh.com/3.x/apt/pool/main/w/wazuh-agent/wazuh-agent_3.8.2-1_amd64.deb"
              iconType="importAction"
            >
              DEB
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              href="https://packages.wazuh.com/3.x/windows/wazuh-agent-3.8.2-1.msi"
              iconType="importAction"
            >
              MSI
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              href="https://packages.wazuh.com/3.x/osx/wazuh-agent-3.8.2-1.pkg"
              iconType="importAction"
            >
              PKG
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
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
      </EuiText>
    )
  },
  {
    title: 'Open etc/ossec.conf in an editor',
    children: (
      <EuiText>
        <p>
          Replace <strong>MANAGER_IP</strong> with the Wazuh server address.
        </p>
        <EuiCodeBlock language="xml">{configurationSample}</EuiCodeBlock>
      </EuiText>
    )
  },
  {
    title: 'Register the agent using the registration service',
    children: (
      <EuiText>
        <EuiCodeBlock language="bash">
          bin/agent-auth -m MANAGER_IP
        </EuiCodeBlock>
      </EuiText>
    )
  },
  {
    title: 'Restart the Wazuh agent',
    children: (
      <EuiText>
        <p>For Systemd</p>
        <EuiCodeBlock language="bash">
          systemctl restart wazuh-agent
        </EuiCodeBlock>
        <p>For SysV</p>
        <EuiCodeBlock language="bash">service wazuh-agent restart</EuiCodeBlock>
      </EuiText>
    )
  }
];
