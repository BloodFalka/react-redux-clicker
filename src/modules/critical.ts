const critical = (damage: number, criticalChance: number, criticalMultipler: number) => {
	const isCritical = Math.ceil(Math.random() * 1000) <= criticalChance * 10 ? true : false
	if (isCritical) {
		return damage * criticalMultipler
	}
	return damage
}

export default critical
