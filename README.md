# AMEE Search
The AMEE Company Search tool allows you to find company details and the AMEE Score for any company in AMEE's dataset. For more information on the AMEE Score visit [https://www.amee.com/score](https://www.amee.com/score)

##Prototype
A working prototype can be found [here](http://amee-fifteenfifteen.rhcloud.com/).

##Build & Execute Instructions

###Production
1. Install NodeJS (v0.10.32+) & NPM: http://nodejs.org/download
1. Install production modules (Make sure youíre in working directory where package.json is available): `npm install --production`
1. Launch server using NPM: `npm start`

###Development
1. Install Ruby (Windows only): http://rubyinstaller.com
1. Install Compass: `gem install compass` - May need sudo
1. Install NodeJS (v0.10.32+) & NPM: http://nodejs.org/download
1. Install Grunt: `npm install -g grunt-cli` - May need sudo
1. Install modules (Make sure youíre in working directory where package.json is available): `npm install`
1. Build & launch project using grunt: `grunt dev`