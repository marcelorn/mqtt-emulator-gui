#/bin/sh

ls -l .

stubDir=$(cd $(dirname ${0}) && pwd -P)

if [ -z ${1} ]; then
	echo "usage: export [New component name]"
	exit 1
fi
	
outputComponent="${1}"
echo "Exporting file to ${outputComponent}"

pushd ${stubDir} && \
	mkdir ${outputComponent} && \
	cp Stub.jsx ${outputComponent}/${outputComponent}.jsx && \
	cp index.js ${outputComponent}/ && \
	sed "s/Stub/${outputComponent}/g" -i ${outputComponent}/* && \
	popd

