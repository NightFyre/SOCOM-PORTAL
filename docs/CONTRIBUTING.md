# Contributing to SOCOM Portal

Thank you for your interest in contributing to the SOCOM Portal project! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues
If you find bugs, have suggestions, or want to request features:

1. Check existing issues to avoid duplicates
2. Create a new issue with a clear title
3. Provide detailed description including:
   - What you expected to happen
   - What actually happened
   - Steps to reproduce (if applicable)
   - Screenshots or videos (if relevant)
   - Your Battlefield 2042 and Portal version

### Suggesting Improvements

We welcome suggestions for:
- New game modes or variations
- Map configurations and improvements
- Weapon balance adjustments
- Gameplay rule modifications
- Documentation improvements
- Quality of life features

### Submitting Changes

#### For Documentation Changes
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improved-docs`)
3. Make your changes
4. Test that all links work and formatting is correct
5. Commit with clear messages
6. Push to your fork
7. Submit a pull request

#### For Configuration Changes
1. Test your configuration thoroughly in Battlefield 2042 Portal
2. Document your changes clearly
3. Include before/after comparisons if applicable
4. Provide reasoning for balance changes
5. Submit as a pull request with detailed description

## Contribution Guidelines

### Documentation Style
- Use clear, concise language
- Include examples where helpful
- Format with Markdown
- Use proper headings and structure
- Include code blocks for Portal rules

### File Organization
```
SOCOM-PORTAL/
├── game-modes/          # Game mode documentation
├── maps/                # Map configurations
├── weapons/             # Weapon and loadout configs
├── settings/            # Team and gameplay settings
├── docs/                # General documentation
└── README.md            # Main project README
```

### Naming Conventions
- Use UPPERCASE for main documentation files
- Use descriptive names (e.g., `SUPPRESSION.md` not `mode1.md`)
- Use hyphens for multi-word files (e.g., `MAP_CONFIGURATIONS.md`)

### Content Guidelines

#### For Game Mode Documentation
Include:
- Clear overview and objectives
- Detailed rules
- Team setup
- Win conditions
- Portal configuration settings
- Tips for implementation

#### For Map Configurations
Include:
- Map name and best game modes
- Playable area description
- Spawn point locations
- Objective placements
- Boundary setup instructions
- Testing checklist

#### For Weapon/Loadout Changes
Include:
- Reasoning for changes
- Balance considerations
- Testing results
- Impact on gameplay
- Comparison with previous config

### Code Style (Portal Rules)
When including Portal Rules Editor code:
- Use clear variable names
- Comment complex logic
- Use consistent indentation
- Include explanatory comments
- Test thoroughly before submitting

Example:
```javascript
// Good: Clear and commented
OnPlayerDied() {
    // Prevent respawn during active round
    DisableRespawn(EventPlayer);
    
    // Set spectator to watch teammates
    SetSpectatorTarget(EventPlayer, RandomTeammate);
    
    // Check if entire team is eliminated
    if (CountAlive(EventPlayer.Team) == 0) {
        RoundVictory(OpposingTeam);
    }
}
```

## Testing Requirements

### Before Submitting
- [ ] Test in Battlefield 2042 Portal (if configuration change)
- [ ] Verify documentation is accurate
- [ ] Check all links work
- [ ] Ensure formatting is correct
- [ ] Spell check and grammar check
- [ ] Test with different team sizes (if applicable)
- [ ] Get feedback from at least one other player

### For Balance Changes
- [ ] Test in multiple matches
- [ ] Gather feedback from other players
- [ ] Document win rates and gameplay flow
- [ ] Consider impact on all skill levels
- [ ] Test edge cases

## Pull Request Process

1. **Create Pull Request:**
   - Use descriptive title
   - Reference related issues
   - Provide detailed description
   - Include testing notes

2. **PR Description Should Include:**
   - What changes were made
   - Why changes were made
   - How changes were tested
   - Any potential impacts
   - Screenshots/videos (if UI/gameplay)

3. **Review Process:**
   - Maintainers will review your PR
   - Address any feedback or questions
   - Make requested changes
   - Once approved, PR will be merged

4. **After Merge:**
   - Your contribution will be credited
   - Changes will be in next release
   - Thank you for contributing!

## Community Standards

### Be Respectful
- Treat all contributors with respect
- Provide constructive feedback
- Welcome newcomers
- Assume good intentions

### Be Collaborative
- Share knowledge and experience
- Help others understand your changes
- Accept feedback gracefully
- Work together to improve the project

### Be Transparent
- Clearly communicate your intentions
- Explain your reasoning
- Acknowledge limitations
- Give credit where due

## Types of Contributions Needed

### High Priority
- Game mode balance feedback
- Map configuration testing
- Bug reports
- Documentation improvements

### Medium Priority
- New game mode variations
- Additional map configurations
- Weapon balance suggestions
- Quality of life improvements

### Low Priority
- Advanced Portal scripting examples
- Tournament configurations
- Statistical analysis tools
- Community resources

## Getting Help

### Questions?
- Check existing documentation first
- Search closed issues for answers
- Create a new issue for questions
- Join community discussions

### Need Technical Help?
- Portal Rules Editor questions → Check Portal documentation
- Git/GitHub help → Check GitHub guides
- Markdown formatting → Check Markdown guides

## Recognition

All contributors will be:
- Listed in project credits
- Acknowledged in release notes
- Thanked in the community

Significant contributions may result in:
- Maintainer status
- Special recognition
- Feature naming rights

## License

By contributing, you agree that your contributions will be licensed under the MIT License that covers this project.

## Contact

- **Issues:** Use GitHub Issues
- **Discussions:** Use GitHub Discussions
- **Direct Contact:** See README for maintainer info

## Resources

### Helpful Links
- [Battlefield 2042 Portal Documentation](https://www.ea.com/games/battlefield/battlefield-2042/portal)
- [Markdown Guide](https://www.markdownguide.org/)
- [Git Basics](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

### SOCOM Resources
- Classic SOCOM gameplay videos
- Community strategy guides
- Historical game mode information

## Version History

Contributors are encouraged to update this file as the project evolves and new contribution types emerge.

---

Thank you for helping make SOCOM Portal the best tactical experience in Battlefield 2042!
