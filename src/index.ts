import SetupSsh from "./SetupSsh";

const core = require('@actions/core');
const taskz = require('taskz');

const tasks = new taskz([
    {
        text: 'Setup SSH',
        task: () => SetupSsh({
            privateKey: core.getInput('ssh-private-key'),
            knownHosts: core.getInput('ssh-known-hosts'),
            disableHostKeyChecking: <boolean>core.getInput('ssh-disable-host-key-checking'),
        })
    },
], { parallel: true });

tasks.run();
