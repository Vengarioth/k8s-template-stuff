const fs = require('fs');
const persistentVolumeTemplate = require('./templates/persistent-volumes');
const values = require('../values.json');

const { spacer, basepath, hostname, persistentVolumes } = values;

const templates = persistentVolumes.map(({ size, count }) => Array.from(Array(count)).map((_, i) => 
    persistentVolumeTemplate(basepath, hostname, size, i)));
const rendered = templates.map(t => t.join(spacer)).join(spacer);

const mkdirTemplates = persistentVolumes.map(({ size, count }) => Array.from(Array(count)).map((_, i) => 
    `${basepath}${size}-${i}`));
const mkdirRendered = mkdirTemplates.map(t => t.join(' ')).join(' ');

fs.writeFileSync('./persistent-volumes.yaml', rendered);
fs.writeFileSync('./create-directories.sh', `mkdir ${mkdirRendered}`);
