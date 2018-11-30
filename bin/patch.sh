echo "Patching React third-party libraries..."
cd node_modules/react-native
rm -rf third-party
echo "...configuring third party scripts..."
./scripts/ios-install-third-party.sh
echo "...configuring glog-0.3.4..."
cd third-party/glog-0.3.4
../../scripts/ios-configure-glog.sh
echo "FINISHED patching React third-party scripts"
