export default function () {
  return [
    name =>
      name.length == 0 || /^[a-zA-ZęĘóÓąĄśŚłŁżŻźŹćĆńŃ\s]+$/.test(name) || this.$t('nameErrors[0]'),
    name => name.length == 0 || /.+\s.+/.test(name) || this.$t('nameErrors[1]'),
  ];
}
