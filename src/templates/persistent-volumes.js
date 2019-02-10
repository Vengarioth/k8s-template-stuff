module.exports = (basepath, hostname, size, id) => `apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-local-${String(size).toLowerCase()}-${id}
spec:
  capacity:
    storage: ${size}
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  local:
    path: ${basepath}${size}-${id}
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - ${hostname}`;
